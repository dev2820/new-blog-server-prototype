const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRES_IN = "1m";
const REFRESH_TOKEN_EXPIRES_IN = "1m";

const generateToken = (content, options) => {
  return jwt.sign(content, process.env.JWT_SECRET, options);
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

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
};
