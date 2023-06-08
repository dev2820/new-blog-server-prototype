const Router = require("@koa/router");

const api = new Router();
const auth = require("./auth");
const user = require("./user");
const link = require("./link");
const post = require("./post");

api.use("/auth", auth.routes());
api.use("/user", user.routes());
api.use("/link", link.routes());
api.use("/post", post.routes());

module.exports = api;
