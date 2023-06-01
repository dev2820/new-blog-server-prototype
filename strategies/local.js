const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Auth } = require("../models");
const SECRET = process.env.JWT_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  session: false,
};

const strategy = new JwtStrategy(options, async (jwtPayload, done) => {
  /**
   * check expired
   */
  if (Date.now() >= jwtPayload.exp * 1000) {
    const refreshToken = await Auth.find(jwtPayload.email);
    if (!refreshToken || Date.now() >= refreshToken.exp * 1000) {
      return done(null, false, {
        status: 403,
        message: "접근 권한이 없습니다",
      });
    }

    return done(null, false, {
      status: 401,
      message: "토큰이 만료되었습니다",
    });
  }
  return done(null, jwtPayload);
});

module.exports = strategy;
