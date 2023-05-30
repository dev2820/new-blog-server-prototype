const Koa = require("koa");
const cors = require("@koa/cors");
const { passport } = require("./middlewares");
require("dotenv").config();

const app = new Koa();
const router = require("./router");
const PORT = process.env.PORT;

app.use(cors());
passport.registPassport(app);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`${PORT} is used`);
});
