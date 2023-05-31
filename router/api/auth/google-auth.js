const Router = require("@koa/router");
const passport = require("../../../middlewares/passport");
const jwt = require("jsonwebtoken");

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
    failureRedirect: "/callback/failure",
  }),
  (ctx) => {
    const user = ctx.state.user._json;
    /**
     * profile을 기반으로 jwt토큰을 만들어 부여한다.
     */
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    ctx.redirect(
      `https://new-blog.store/login/callback?username=${user.name}&avator=${user.picture}&token=${token}`
    );
  }
);

Google.get("/callback/failure", (ctx) => {
  ctx.body = "로그인에 실패했습니다!";
});

module.exports = Google;
