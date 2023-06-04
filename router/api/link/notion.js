const Router = require("@koa/router");
const notionRouter = new Router();
const { Notion } = require("../../../models");
const passport = require("../../../middlewares/passport");
const axios = require("axios");

/**
 * 노션 auth로 redirect
 */
notionRouter.get("/", (ctx) => {
  ctx.redirect(process.env.NOTION_AUTH_URL);
});

notionRouter.get("/callback", async (ctx) => {
  /**
   * notion 연결 처리
   */
  const { code } = ctx.request.query;
  ctx.redirect(`https://new-blog.store/link/notion/callback?code=${code}`);
});

notionRouter.get("/callback/failure", (ctx) => {
  ctx.body = "연결에 실패했습니다!";
});

notionRouter.post(
  "/regist-code",
  passport.authenticate("local", { session: false }),
  async (ctx) => {
    const { user } = ctx.state;
    if (!user) ctx.throw(401);

    const { email } = user;
    const { code } = ctx.request.body;
    const encoded = Buffer.from(
      `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
    ).toString("base64");

    try {
      const { data } = await axios.post(
        "https://api.notion.com/v1/oauth/token",
        {
          grant_type: "authorization_code",
          code,
          redirect_uri: "https://new-blog.store/api/link/notion/callback",
        },
        {
          headers: {
            Authorization: `Basic ${encoded}`,
          },
        }
      );

      const { access_token: accessToken } = data;
      console.log("!");
      if (await Notion.find(email)) {
        console.log("update");
        await Notion.update(email, accessToken);
      } else {
        console.log("create");
        await Notion.create(email, accessToken);
      }
      console.log("!!");
      ctx.body = "";
    } catch (error) {
      console.log(error.message);
      ctx.throw(500);
    }
  }
);
module.exports = notionRouter;
