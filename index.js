const Koa = require("koa");
const cors = require("@koa/cors");
const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();

const app = new Koa();
const router = require("./router");
const PORT = process.env.PORT;

app.use(cors());
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      console.log("profile:", profile);
      return done(null, profile);
    }
  )
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`${PORT} is used`);
});
