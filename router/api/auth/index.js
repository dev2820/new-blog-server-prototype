const Router = require("@koa/router");
const GoogleAuth = require("./google-auth");
const { token } = require("../../../utils");
const { Auth } = require("../../../models");

const authRouter = new Router();

authRouter.get("/", async (ctx) => {
  ctx.body = { message: "hello world" };
});

authRouter.use("/google", GoogleAuth.routes());
authRouter.get("/update-token", async (ctx) => {
  /**
   * 토큰 재발급
   */
  try {
    const _prevToken = ctx.headers.authorization.split(" ")[1];
    const decoded = token.verify(_prevToken, { ignoreExpiration: true });
    if (!decoded) throw Error();

    const { email } = decoded;
    const refreshToken = await Auth.find(email);
    /**
     * refresh token이 없다 or 유효하지 않다
     * 로그인 할 것을 요청한다. (403)
     */
    token.verify(refreshToken);

    /**
     * access token이 만료되었고 refresh token도 있다.
     * access token을 새로 발급해준다.
     */
    const newAccessToken = token.generateAccessToken({ email });
    ctx.set("Authorization", `Bearer ${newAccessToken}`);
    ctx.body = null;
  } catch (error) {
    ctx.throw(403);
  }
});

authRouter.use("/logout", async (ctx) => {
  try {
    const _prevToken = ctx.headers.authorization.split(" ")[1];
    const decoded = token.verify(_prevToken, { ignoreExpiration: true });
    if (!decoded) throw Error();

    const { email } = decoded;
    Auth.remove(email);
    ctx.body = "";
  } catch (error) {
    ctx.throw(403);
  }
  await remove(ctx);
});

module.exports = authRouter;
