const Router = require("@koa/router");
const passport = require("koa-passport");

const Auth = new Router();

Auth.get("/", async (ctx) => {
  ctx.body = { message: "hello world" };
});

Auth.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Auth.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/google/callback/failure",
  }),
  (ctx) => {
    ctx.redirect("https://new-blog.store/");
  }
);

Auth.get("/google/callback/failure", (ctx) => {
  ctx.body = "로그인에 실패했습니다!";
});

module.exports = Auth;
