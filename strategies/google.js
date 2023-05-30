const GoogleStrategy = require("passport-google-oauth20");
const { User } = require("../models");
const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
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
    const user = await User.find(profile.provider, profile.id);
    console.log("user:", user);
    if (!user) {
      User.create(
        profile.displayName,
        profile.id,
        profile.email,
        profile.provider
      );
    }

    return done(null, profile);
  }
);

module.exports = strategy;
