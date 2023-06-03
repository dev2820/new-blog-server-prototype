const Router = require("@koa/router");
const Notion = new Router();
const axios = require("axios");

Notion.get("/", (ctx) => {
  /**
   * 노션 연결 생성
   */
  ctx.redirect(process.env.NOTION_AUTH_URL);
  // ctx.body = "Hello World!@";
});

Notion.get("/callback", async (ctx) => {
  /**
   * notion 연결 처리
   */
  const { code } = ctx.request.query;
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

    console.log(data);
  } catch (err) {
    ctx.throw(400);
  }

  const accessToken = "??";
  ctx.redirect(`https://new-blog.store/api/link/callback?token=${accessToken}`);
});

Notion.get("/callback/failure", (ctx) => {
  ctx.body = "연결에 실패했습니다!";
});

module.exports = Notion;
