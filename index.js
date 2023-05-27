const Koa = require("koa");
const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();

const app = new Koa();
const router = require("./router");
const PORT = process.env.PORT;

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile);
      return done(null, profile);
    }
  )
);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`${PORT} is used`);
});
