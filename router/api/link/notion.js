const Router = require("@koa/router");
const Notion = new Router();

Notion.get("/", (ctx) => {
  /**
   * 노션 연결 생성
   */
  ctx.redirect(process.env.NOTION_AUTH_URL);
  ctx.body = "Hello World!@";
});

Notion.get("/callback", async (ctx) => {
  /**
   * notion 연결 처리
   */

  const accessToken = "temp";
  ctx.redirect(`https://new-blog.store/link/callback?token=${accessToken}`);
});

Notion.get("/callback/failure", (ctx) => {
  ctx.body = "연결에 실패했습니다!";
});

module.exports = Notion;
