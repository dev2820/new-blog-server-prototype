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
    /**
     * id를 읽어와서 notion으로부터 blocks 가져오고 업로드 하도록 수정하기
     * path를 입력받아 post-structure에 넣기
     */
    if (provider === "notion") {
      const content = await notion.getPageContent(pageId, accessToken);
      const meta = await notion.getPageMeta(pageId, accessToken);
      console.log({ author: user.email, title: getTitle(meta) });
      if (Post.exists({ author: user.email, title: getTitle(meta) })) {
        console.log("exist??");
        await Post.updateOne(
          { title: getTitle(meta), author: user.email },
          { blocks: content.blocks }
        );
      } else {
        const newPost = new Post({
          title: getTitle(meta),
          author: user.email,
          blocks: content.blocks,
        });
        console.log(37, newPost);
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
