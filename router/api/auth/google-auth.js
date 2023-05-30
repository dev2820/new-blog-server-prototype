const Router = require("@koa/router");
const passport = require("../../../middlewares/passport");

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
    const { query } = ctx;
    const user = ctx.state.user._json;

    console.log(query);

    ctx.redirect(
      `https://new-blog.store?username=${user.name}&avator=${user.picture}`
    );
  }
);

Google.get("/callback/failure", (ctx) => {
  ctx.body = "로그인에 실패했습니다!";
});

module.exports = Google;
