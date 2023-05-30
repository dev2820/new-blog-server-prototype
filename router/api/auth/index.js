const Router = require("@koa/router");
const googleAuth = require("./google-auth");
const Auth = new Router();

Auth.get("/", async (ctx) => {
  ctx.body = { message: "hello world" };
});

Auth.use("/google", googleAuth.routes());

module.exports = Auth;
