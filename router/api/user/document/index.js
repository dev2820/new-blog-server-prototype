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
    console.log(meta, blocks);
    await Post.insertMany([
      { title: getTitle(meta), author: user.email, blocks },
    ]);
    ctx.body = "";
  }
);
module.exports = Document;

const getTitle = (meta) => {
  if (!meta.properties) return "";
  return meta.properties.title.title[0].text.content;
};
