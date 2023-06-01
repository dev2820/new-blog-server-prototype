const Router = require("@koa/router");
const GoogleAuth = require("./google-auth");
const { passport } = require("../../../middlewares");
const { token } = require("../../../utils");

const Auth = new Router();

Auth.get("/", async (ctx) => {
  ctx.body = { message: "hello world" };
});

Auth.use("/google", GoogleAuth.routes());
Auth.get("/update-token", async (ctx) => {
  /**
   * 토큰 재발급
   */
  const _token = ctx.headers.authorization.split(" ")[1];

  try {
    /**
     * access token이 없다 or 유효하지 않다
     * 요청을 거절한다. (403)
     */
    const decoded = token.verify(_token);
    console.log(decoded);
    if (!decoded) throw Error();

    /**
     * refresh token이 없다 or 유효하지 않다
     * 로그인 할 것을 요청한다. (403)
     */
    const refreshToken = await Auth.find(decoded.email);
    if (!refreshToken || Date.now() >= refreshToken.exp * 1000) {
      throw Error();
    }

    /**
     * access token이 만료되었고 refresh token도 있다.
     * access token을 새로 발급해준다.
     */
    const userEmail = user.emails.find((email) => email.verified).value;
    const newAccessToken = token.generateAccessToken({ email: userEmail });
    ctx.set("Authorization", `Bearer ${newAccessToken}`);
  } catch (error) {
    ctx.throw(403);
  }
});

module.exports = Auth;
