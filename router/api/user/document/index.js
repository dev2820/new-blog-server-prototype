const Router = require("@koa/router");
const { Client } = require("@notionhq/client");
const { passport } = require("../../../../middlewares");
const { Notion } = require("../../../../models");
const notionRouter = require("./notion");
const Document = new Router();

Document.use("/notion", notionRouter.routes());

module.exports = Document;
