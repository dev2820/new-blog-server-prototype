const Router = require("@koa/router");
const { Client } = require("@notionhq/client");
const { passport } = require("../../../../middlewares");
const { Notion } = require("../../../../models");
const axios = require("axios");
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
  const pageContent = rawPageContent;
  // for (let i = 0; i < rawPageContent.length; i++) {
  //   const content = rawPageContent[i];
  //   if (content.type !== "image") {
  //     pageContent.push(content);
  //     continue;
  //   }
  //   console.log("work");
  //   try {
  //     let image = await axios.get(content["image"].file.url, {
  //       responseType: "arraybuffer",
  //     });
  //     // let returnedB64 = Buffer.from(image.data).toString("base64");
  //     content["image"].file.base64 = returnedB64;
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   pageContent.push(content);
  // }

  return pageContent;
};

const normalizePageMeta = (rawPageMeta) => {
  return rawPageMeta;
};

module.exports = notionRouter;
