const Router = require("@koa/router");

const api = new Router();
const auth = require("./auth");
const user = require("./user");
const link = require("./link");

api.use("/auth", auth.routes());
api.use("/user", user.routes());
api.use("/link", link.routes());

module.exports = api;
