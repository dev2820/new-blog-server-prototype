require("dotenv").config();
const Koa = require("koa");
const cors = require("@koa/cors");
const { passport } = require("./middlewares");
const router = require("./router");

const app = new Koa();
const PORT = process.env.PORT;

app.use(cors());
passport.registPassport(app);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`${PORT} is used`);
});
