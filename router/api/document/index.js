const Router = require("@koa/router");
const { Post } = require("../../../models");
const documentRouter = new Router();

documentRouter.get("/@:author/:title", async (ctx) => {
  const { author, title } = ctx.params.title;
  const post = await Post.findOne({ author, title });

  ctx.body = post;
});

module.exports = documentRouter;
