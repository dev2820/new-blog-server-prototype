const Router = require("@koa/router");
const { passport } = require("../../../middlewares");
const { User } = require("../../../models");
const userRouter = new Router();

userRouter.get(
  "/",
  passport.authenticate("local", { session: false }),
  (ctx) => {
    const { user } = ctx.state;
    if (!user) ctx.throw(401);

    User.find();
    ctx.body = { message: "im authed" };
  }
);

module.exports = userRouter;
