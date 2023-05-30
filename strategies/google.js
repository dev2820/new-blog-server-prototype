const GoogleStrategy = require("passport-google-oauth20");
const { User } = require("../models");
const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.find(profile.provider, profile.id);

    if (!user) {
      User.create(
        profile.displayName,
        profile.id,
        profile.emails[0].value,
        profile.provider
      );
    }
    /**
     * profile을 기반으로 jwt토큰을 만들어 부여한다.
     */

    return done(null, profile);
  }
);

module.exports = strategy;
