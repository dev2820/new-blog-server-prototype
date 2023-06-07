const Router = require("@koa/router");
const { Client } = require("@notionhq/client");
const { passport } = require("../../../../middlewares");
const { Notion, Post } = require("../../../../models");
const notionRouter = require("./notion");
const Document = new Router();

Document.use("/notion", notionRouter.routes());

Document.post(
  "/publish",
  passport.authenticate("local", { session: false }),
  async (ctx) => {
    const { user } = ctx.state;
    const { meta, blocks } = ctx.request.body;

    /**
     * blocks에서 image는 s3에 업로드하고 url 변경하기
     */
    if (Post.exists({ author: user.email, title: getTitle(meta) })) {
      await Post.updateOne(
        { title: getTitle(meta), author: user.email },
        { $set: { blocks } }
      );
    } else {
      await Post.collection.insertOne({
        title: getTitle(meta),
        author: user.email,
        blocks,
      });
    }

    ctx.body = "";
  }
);

const getTitle = (meta) => {
  if (!meta.properties) return "";
  return meta.properties.title.title[0].text.content;
};

module.exports = Document;
