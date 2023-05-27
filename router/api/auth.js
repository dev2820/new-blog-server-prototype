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
  passport.authenticate("google", { failureRedirect: "/login" }),
  (ctx) => {
    ctx.redirect("https://new-blog-web-prototype.vercel.app/");
  }
);

module.exports = Auth;
