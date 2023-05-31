const Router = require("@koa/router");
const { jwtMiddleware } = require("./middlewares");
const User = new Router();

User.get("/", jwtMiddleware, (ctx) => {
  ctx.body = { message: "im authed" };
});

module.exports = User;
