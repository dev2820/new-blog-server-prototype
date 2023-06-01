const Router = require("@koa/router");
const GoogleAuth = require("./google-auth");
const { passport } = require("../../../middlewares");
const jwt = require("jsonwebtoken");

const Auth = new Router();

Auth.get("/", async (ctx) => {
  ctx.body = { message: "hello world" };
});

Auth.use("/google", GoogleAuth.routes());
Auth.get("/refresh", passport.authenticate("local"), async (ctx) => {
  /**
   * 토큰 재발급
   */
  /**
   * access token이 없다 or 유효하지 않다 -> 401
   * refresh token이 없다 or 유효하지 않다 -> 403
   * refresh token
   */
  /**
   * access token이 없다 or 유효하지 않다
   * 요청을 거절한다. (401)
   */
  if (!ctx.user) {
    ctx.throw(401);
  }

  /**
   * refresh token이 없다 or 유효하지 않다
   * 로그인 할 것을 요청한다. (403)
   */
  if (ctx.user.status === 403) {
    ctx.throw(403);
  }

  /**
   * access token이 만료되었고 refresh token도 있다.
   * access token을 새로 발급해준다.
   */
  if (ctx.user.status === 401) {
    const newAccessToken = jwt.sign(
      { id: user.id, provider: user.provider },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      }
    );
    ctx.set("Authorization", `Bearer ${newAccessToken}`);
  }
});
module.exports = Auth;
