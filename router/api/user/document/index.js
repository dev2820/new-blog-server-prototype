const Router = require("@koa/router");
const { passport } = require("../../../../middlewares");
const { Notion, Post } = require("../../../../models");
const { notion } = require("../../../../utils");

const notionRouter = require("./notion");
const Document = new Router();

Document.use("/notion", notionRouter.routes());

Document.post(
  "/publish",
  passport.authenticate("local", { session: false }),
  async (ctx) => {
    const { user } = ctx.state;
    const { provider, pageId } = ctx.request.body;
    const { access_token: accessToken } = await Notion.find(user.email);

    if (provider === "notion") {
      const content = await notion.getPageContent(pageId, accessToken);
      const meta = await notion.getPageMeta(pageId, accessToken);

      if (await Post.exists({ author: user.name, title: getTitle(meta) })) {
        await Post.updateOne(
          { title: getTitle(meta), author: user.name },
          { blocks: content }
        );
      } else {
        const newPost = new Post({
          title: getTitle(meta),
          author: user.name,
          blocks: content,
        });
        await newPost.save();
      }
    }
    /**
     * blocks에서 image는 s3에 업로드하고 url 변경하기
     */

    ctx.body = "";
  }
);

const getTitle = (meta) => {
  if (!meta.properties) return "";
  return meta.properties.title.title[0].text.content;
};

module.exports = Document;
