const Router = require("@koa/router");
const { passport } = require("../../../middlewares");
const { User } = require("../../../models");
const documentRouter = require("./document");
const userRouter = new Router();

userRouter.get(
  "/",
  passport.authenticate("local", { session: false }),
  async (ctx) => {
    const { user } = ctx.state;
    if (!user) ctx.throw(401);

    const _userInfo = await User.find(user.email);
    const profile = {
      name: _userInfo.name,
      avator: _userInfo.avator,
    };
    ctx.body = profile;
  }
);

userRouter.use(documentRouter.routes());

module.exports = userRouter;
