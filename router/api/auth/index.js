const Router = require("@koa/router");
const GoogleAuth = require("./google-auth");
const Auth = new Router();

Auth.get("/", async (ctx) => {
  ctx.body = { message: "hello world" };
});

Auth.use("/google", GoogleAuth.routes());

module.exports = Auth;
