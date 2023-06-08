const Router = require("@koa/router");
const { Post } = require("../../../models");
const postRouter = new Router();

postRouter.get("/@:author/:title", async (ctx) => {
  const { author, title } = ctx.params;
  console.log(author, title);
  const post = await Post.findOne({ author, title });

  const response = {
    meta: {
      author: post.author,
      title: post.title,
    },
    contents: post.blocks,
  };
  ctx.body = post;
});

module.exports = postRouter;
