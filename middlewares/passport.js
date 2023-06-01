const passport = require("koa-passport");

const init = (app) => {
  app.use(passport.initialize());
};
/**
 * add passport middleware to app
 * @param app koa application
 * @returns app
 */
const regist = (app, strategies) => {
  strategies.forEach(({ name, strategy }) => passport.use(name, strategy));

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
  init,
  regist,
  authenticate,
};
