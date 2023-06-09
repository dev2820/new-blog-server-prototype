const Router = require("@koa/router");
const { Post } = require("../../../models");
const normalizer = require("../../../utils/normalizer");
const postRouter = new Router();

postRouter.get("/@:author/:title", async (ctx) => {
  const { author, title } = ctx.params;
  const post = await Post.findOne({ author, title });
  const response = {
    meta: {
      author: post.author,
      title: post.title,
    },
    contents: normalizePageContent(post.blocks),
  };

  ctx.body = response;
});

module.exports = postRouter;

const normalizePageContent = (rawPageContent) => {
  const pageContent = rawPageContent.map((block) => {
    if (block.type === "paragraph") return normalizer.normalizeParagraph(block);
    if (block.type === "image") return normalizer.normalizeImage(block);
    if (block.type === "bookmark") return normalizer.normalizeBookmark(block);
    if (block.type === "heading_1") return normalizer.normalizeHeading1(block);
    if (block.type === "heading_2") return normalizer.normalizeHeading2(block);
    if (block.type === "heading_3") return normalizer.normalizeHeading3(block);
    if (block.type === "bulleted_list_item")
      return normalizer.normalizeBulletedListItem(block);
    if (block.type === "quote") return normalizer.normalizeQuote(block);
    return block;
  });

  return pageContent;
};
