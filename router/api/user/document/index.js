const Router = require("@koa/router");
const { Client } = require("@notionhq/client");
const { passport } = require("../../../../middlewares");
const { Notion } = require("../../../../models");
const Document = new Router();

Document.get(
  "/",
  passport.authenticate("local", { session: false }),
  async (ctx) => {
    const { user } = ctx.state;
    const { email } = user;
    const { access_token: accessToken } = await Notion.find(email);

    /**
     * 문서를 요청한다
     */
    const pages = await getPageList(accessToken);
    ctx.body = pages;
  }
);

const getPageList = async (accessToken) => {
  const notion = new Client({ auth: accessToken });
  const pages = await notion.search({
    query: "",
    filter: {
      value: "page",
      property: "object",
    },
  });
  return pages;
};

module.exports = Document;
