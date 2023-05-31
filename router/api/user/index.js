const Router = require("@koa/router");
const { passport } = require("../../../middlewares");
const User = new Router();

User.get("/", passport.authenticate("local", { session: false }), (ctx) => {
  ctx.body = { message: "im authed" };
});

module.exports = User;
