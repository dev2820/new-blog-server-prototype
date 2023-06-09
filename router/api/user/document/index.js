const Router = require("@koa/router");
const { passport } = require("../../../../middlewares");
const { Notion, Post, Image } = require("../../../../models");
const { notion } = require("../../../../utils");
const normalizer = require("../../../../utils/normalizer");
const axios = require("axios");
const { v4: uuidV4 } = require("uuid");

const notionRouter = require("./notion");
const Document = new Router();

Document.use("/notion", notionRouter.routes());

Document.post(
  "/publish",
  passport.authenticate("local", { session: false }),
  async (ctx) => {
    const { user } = ctx.state;
    const { provider, pageId } = ctx.request.body;
    const { access_token: accessToken } = await Notion.find(user.email);

    if (provider === "notion") {
      const rawBlocks = await notion.getPageContent(pageId, accessToken);
      const meta = await notion.getPageMeta(pageId, accessToken);
      const blocks = normalizePageContent(rawBlocks);
      const promiseContents = blocks.map((block) => {
        if (block.type === "image") {
          const promiseBlock = new Promise((resolve, reject) => {
            Image.uploadImageFromURL(
              process.env.AWS_S3_BUCKET,
              block.blockId,
              block.url
            ).then((res) => {
              block.url = res;
              resolve(block);
            });
          });
          return promiseBlock;
        } else {
          return block;
        }
      });
      /**
       * upload images
       */
      const content = await Promise.all(promiseContents);
      if (await Post.exists({ author: user.name, title: getTitle(meta) })) {
        await Post.updateOne(
          { title: getTitle(meta), author: user.name },
          { blocks: content }
        );
      } else {
        const newPost = new Post({
          title: getTitle(meta),
          author: user.name,
          blocks: content,
        });
        await newPost.save();
      }
    }

    ctx.body = "";
  }
);

const getTitle = (meta) => {
  if (!meta.properties) return "";
  return meta.properties.title.title[0].text.content;
};

module.exports = Document;

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
    if (block.type === "numbered_list_item")
      return normalizer.normalizeNumberedListItem(block);
    if (block.type === "quote") return normalizer.normalizeQuote(block);
    return block;
  });

  return pageContent;
};
