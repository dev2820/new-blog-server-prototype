const Router = require("@koa/router");
const Notion = require("./notion");

const linkRouter = new Router();

linkRouter.get("/", async (ctx) => {
  ctx.body = { message: "hello link world" };
});

linkRouter.use("/notion", Notion.routes());

module.exports = linkRouter;
