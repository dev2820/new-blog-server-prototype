const Router = require("@koa/router");
const { Client } = require("@notionhq/client");
const { passport } = require("../../../../middlewares");
const { Notion } = require("../../../../models");
const axios = require("axios");
const normalizer = require("../../../../utils/normalizer");
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
    content: await normalizePageContent(content),
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
  const result = await notion.pages.retrieve({ page_id: pageId });

  return result;
};
const getPageContent = async (pageId, accessToken) => {
  const notion = new Client({ auth: accessToken });
  const { results } = await notion.blocks.children.list({ block_id: pageId });

  return results;
};

const normalizePageContent = async (rawPageContent) => {
  const pageContent = rawPageContent.map((block) => {
    if (block.type === "paragraph") return normalizer.normalizeParagraph(block);
    if (block.type === "image") return normalizer.normalizeImage(block);
    if (block.type === "bookmark") return normalizer.normalizeBookmark(block);
    if (block.type === "heading_1") return normalizer.normalizeHeading1(block);
    if (block.type === "heading_2") return normalizer.normalizeHeading2(block);
    if (block.type === "heading_3") return normalizer.normalizeHeading3(block);
    if (block.type === "bulleted_list_item")
      return normalizer.normalizeBulletedListItem(block);
    return block;
  });

  return pageContent;
};

const normalizePageMeta = (rawPageMeta) => {
  return rawPageMeta;
};

module.exports = notionRouter;
