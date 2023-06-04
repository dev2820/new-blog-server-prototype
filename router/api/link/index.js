const Router = require("@koa/router");
const notionRouter = require("./notion");
const { Notion } = require("../../../models");
const { passport } = require("../../../middlewares");
const linkRouter = new Router();

linkRouter.get("/", async (ctx) => {
  ctx.body = { message: "hello link world" };
});

linkRouter.use("/notion", notionRouter.routes());

module.exports = linkRouter;
