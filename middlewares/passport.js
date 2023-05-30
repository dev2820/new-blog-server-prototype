const passport = require("koa-passport");
const { google } = require("./strategies");
/**
 * add passport middleware to app
 * @param app koa application
 * @returns app
 */
const registPassport = (app) => {
  app.use(passport.initialize());

  passport.use(google);

  return app;
};

/**
 * return passport.authenticate
 *
 * @param provider
 * @param options
 */
const authenticate = (provider, options) => {
  return passport.authenticate(provider, options);
};

module.exports = {
  registPassport,
  authenticate,
};
