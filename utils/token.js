const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRES_IN = "1h";
const REFRESH_TOKEN_EXPIRES_IN = "14d";
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (content, options) => {
  return jwt.sign(content, JWT_SECRET, options);
};

const generateAccessToken = (content) => {
  return generateToken(content, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

const generateRefreshToken = (content) => {
  return generateToken(content, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

const verify = (token, options) => {
  return jwt.verify(token, JWT_SECRET, options);
};

const decode = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
  verify,
  decode,
};
