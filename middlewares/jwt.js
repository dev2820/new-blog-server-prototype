const koaJwt = require("koa-jwt");

const secret = process.env.JWT_SECRET;
const jwtMiddleware = koaJwt({ secret });

module.exports = jwtMiddleware;
