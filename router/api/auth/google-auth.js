const Router = require("@koa/router");
const passport = require("../../../middlewares/passport");
const { Auth } = require("../../../models");
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
  async (ctx) => {
    const { user } = ctx.state;

    const accessToken = jwt.sign(
      { id: user.id, provider: user.provider },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id, provider: user.provider },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    console.log(user);
    const existRefreshToken = await Auth.find(user.id, user.provider);
    if (existRefreshToken) {
      Auth.update(user.id, user.provider, refreshToken);
    } else {
      Auth.create(user.id, user.provider, refreshToken);
    }

    ctx.redirect(
      `https://new-blog.store/login/callback?username=${user.name}&avator=${user.picture}&token=${accessToken}`
    );
  }
);

Google.get("/callback/failure", (ctx) => {
  ctx.body = "로그인에 실패했습니다!";
});

module.exports = Google;
