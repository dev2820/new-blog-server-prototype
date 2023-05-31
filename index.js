require("dotenv").config();
const Koa = require("koa");
const cors = require("@koa/cors");
const { passport, jwtMiddleware } = require("./middlewares");
const { google: googleStrategy } = require("./strategies");
const router = require("./router");

const app = new Koa();
const PORT = process.env.PORT;

app.use(cors());
app.use(jwtMiddleware);
passport.init(app);
passport.regist(app, [googleStrategy]);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`${PORT} is used`);
});
