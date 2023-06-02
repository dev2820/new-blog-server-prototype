const Router = require("@koa/router");
const passport = require("../../../middlewares/passport");
const { Auth } = require("../../../models");
const { token } = require("../../../utils");
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
  async (ctx) => {
    const { user } = ctx.state;
    const userEmail = user.emails.find((email) => email.verified).value;
    const avator = user.photos[0].value;

    const accessToken = token.generateAccessToken({ email: userEmail });
    const refreshToken = token.generateAccessToken({ email: userEmail });

    const existRefreshToken = await Auth.find(userEmail);
    if (existRefreshToken) {
      await Auth.update(userEmail, refreshToken);
    } else {
      await Auth.create(userEmail, refreshToken);
    }
    console.log(avator);
    ctx.redirect(
      `https://new-blog.store/login/callback?username=${user.displayName}&avator=${avator}&token=${accessToken}`
    );
  }
);

Google.get("/callback/failure", (ctx) => {
  ctx.body = "로그인에 실패했습니다!";
});

module.exports = Google;
