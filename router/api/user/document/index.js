const Router = require("@koa/router");
const { Client } = require("@notionhq/client");
const { passport } = require("../../../../middlewares");
const { Notion } = require("../../../../models");
const notionRouter = require("./notion");
const Document = new Router();

Document.use("/notion", notionRouter.routes());
Document.post(
  "/publish",
  passport.authenticate("local", { session: false }),
  async (ctx) => {
    const { meta, blocks } = ctx.request.body;
    console.log(meta, blocks);
    ctx.body = "";
  }
);
module.exports = Document;
