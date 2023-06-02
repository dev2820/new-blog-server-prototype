const Router = require("@koa/router");
const { passport } = require("../../../middlewares");
const userRouter = new Router();

userRouter.get(
  "/",
  passport.authenticate("local", { session: false }),
  (ctx) => {
    if (!ctx.user) ctx.throw(401);

    console.log(ctx.user);
    ctx.body = { message: "im authed" };
  }
);

module.exports = userRouter;
