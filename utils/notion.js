const { Client } = require("@notionhq/client");

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

module.exports = {
  getPageMeta,
  getPageContent,
};
