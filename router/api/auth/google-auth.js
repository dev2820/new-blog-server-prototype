const Router = require("@koa/router");
const passport = require("koa-passport");

const Google = new Router();

Google.get(
  "/",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  })
);

Google.get(
  "/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/google/callback/failure",
  }),
  (ctx) => {
    ctx.redirect("https://new-blog.store/");
  }
);

Google.get("/callback/failure", (ctx) => {
  ctx.body = "로그인에 실패했습니다!";
});

module.exports = Google;
