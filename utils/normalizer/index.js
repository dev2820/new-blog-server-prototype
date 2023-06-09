const normalizeParagraph = (block) => {
  return {
    type: "paragraph",
    richText: block["paragraph"].rich_text,
  };
};

const normalizeImage = (block) => {
  return {
    type: "image",
    url: block["image"].file.url,
    blockId: block.id,
    caption: [],
  };
};

const normalizeBulletedListItem = (block) => {
  return {
    type: "bulleted_list_item",
    richText: block["bulleted_list_item"].rich_text,
  };
};

const normalizeHeading1 = (block) => {
  return {
    type: "heading_1",
    richText: block["heading_1"].rich_text,
  };
};

const normalizeHeading2 = (block) => {
  return {
    type: "heading_2",
    richText: block["heading_2"].rich_text,
  };
};

const normalizeHeading3 = (block) => {
  return {
    type: "heading_3",
    richText: block["heading_3"].rich_text,
  };
};

const normalizeBookmark = (block) => {
  console.log(block);
  return {
    type: "bookmark",
    url: block["bookmark"].url,
  };
};

const normalizeQuote = (block) => {
  return {
    type: "quote",
    richText: block["quote"].rich_text,
  };
};

module.exports = {
  normalizeParagraph,
  normalizeImage,
  normalizeBulletedListItem,
  normalizeHeading1,
  normalizeHeading2,
  normalizeHeading3,
  normalizeBookmark,
  normalizeQuote,
};
