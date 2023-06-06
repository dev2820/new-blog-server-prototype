const Router = require("@koa/router");
const { Client } = require("@notionhq/client");
const { passport } = require("../../../../middlewares");
const { Notion } = require("../../../../models");
const notionRouter = new Router();

notionRouter.use(passport.authenticate("local", { session: false }));

notionRouter.get("/", async (ctx) => {
  const { user } = ctx.state;
  const { email } = user;
  const { access_token: accessToken } = await Notion.find(email);

  /**
   * 문서를 요청한다
   */
  const pages = await getPageList(accessToken);
  ctx.body = pages;
});

notionRouter.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  const { user } = ctx.state;
  const { email } = user;
  const { access_token: accessToken } = await Notion.find(email);

  const meta = await getPageMeta(id, accessToken);
  const content = await getPageContent(id, accessToken);

  ctx.body = {
    meta: normalizePageMeta(meta),
    content: normalizePageContent(content),
  };
});

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

const getPageMeta = async (pageId, accessToken) => {
  const notion = new Client({ auth: accessToken });
  const { results } = await notion.pages.retrieve({ page_id: pageId });

  return results;
};
const getPageContent = async (pageId, accessToken) => {
  const notion = new Client({ auth: accessToken });
  const { results } = await notion.blocks.children.list({ block_id: pageId });

  return results;
};

const normalizePageContent = (rawPageContent) => {
  return rawPageContent;
};

const normalizePageMeta = (rawPageMeta) => {
  return rawPageMeta;
};

module.exports = notionRouter;
