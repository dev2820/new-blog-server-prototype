const passport = require("koa-passport");
const GoogleStrategy = require("passport-google-oauth20");

/**
 * add passport middleware to app
 * @param app koa application
 * @returns app
 */
const registPassport = (app) => {
  app.use(passport.initialize());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        /**
         * TODO:
         * provider와 id를 조합해 유저를 식별한다.
         *
         * 계정을 조회하고 있다면 기존 유저, 없다면 신규 유저이다.
         * 신규 유저라면 User DB에 저장한다.
         * refreshToken이 발급되었다면 Auth DB에 저장한다. (redis)
         * accessToken과 profile을 반환한다.
         * 이제 client는 bearer 헤더에 accessToken을 저장해 같이 보내야한다.
         */
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        console.log("profile:", profile);
        return done(null, profile);
      }
    )
  );
  return app;
};

/**
 * return passport.authenticate
 *
 * @param provider
 */
const authenticate = (provider) => {
  return passport.authenticate(provider);
};
module.exports = {
  registPassport,
  authenticate,
};
