const Router = require("@koa/router");
const { Post } = require("../../../models");
const postRouter = new Router();

postRouter.get("/@:author/:title", async (ctx) => {
  const { author, title } = ctx.params;
  console.log(author, title);
  const post = await Post.findOne({ author, title });

  ctx.body = post;
});

module.exports = postRouter;
