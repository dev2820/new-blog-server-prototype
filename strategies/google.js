const GoogleStrategy = require("passport-google-oauth20");
const { User } = require("../models");

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (_, __, profile, done) => {
    try {
      const user = await User.find(profile.provider, profile.id);
      console.log(user);
      if (!user) {
        User.create(
          profile.displayName,
          profile.id,
          profile.emails[0].value,
          profile.provider,
          profile.photos[0].value
        );
      }

      return done(null, profile);
    } catch (err) {
      return done(null, false, { message: "create user failed" });
    }
  }
);

module.exports = strategy;
