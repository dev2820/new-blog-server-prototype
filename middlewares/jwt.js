const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;
const extractToken = (authorization) => {
  const start = 'Bearer '.length
  return authorization.substring(start)
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "24h" });
};

const jwtMiddleware = async (ctx,next) => {
  const authorization = ctx.request.headers.authorization

  if(!authorization || !authorization.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = 'Refresh token not found'
    return;
  }

  try {
    const accessToken = extractToken(authorization)
    const decoded = verifyToken(accessToken)

    if(decoded) {
      await next();
    }
    else {
      /**
       * get refresh token from redis
       * and verify refresh token
       */
    }
  } catch(err) {

  }
  if(verifyToken())
  

}

module.exports = jwtMiddleware;
