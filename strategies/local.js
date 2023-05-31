const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const SECRET = process.env.JWT_SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  session: false,
};

const strategy = new JwtStrategy(options, async (jwtPayload, done) => {
  /**
   * redis에서 jwtPayload.userId를 검사
   * 유저가 없다 => 잘못된 토큰임 done(err)
   */

  return done(null, jwtPayload);
});

module.exports = strategy;
