const Router = require("@koa/router");
const { Notion } = require("../../../../models");
const Document = new Router();

Document.get(
  "/",
  passport.authenticate("local", { session: false }),
  async (ctx) => {
    const { user } = ctx;
    const { email } = user;
    const { accessToken } = await Notion.find(email);

    /**
     * 문서를 요청한다
     */
  }
);

module.exports = Notion;
