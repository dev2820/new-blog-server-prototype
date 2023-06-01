const redis = require("async-redis");

const _setValue = async (key, value) => {
  const client = redis.createClient();
  await client.set(key, value);
  client.quit();
};

const _getValue = async (key) => {
  const client = redis.createClient();
  const value = await client.get(key);
  client.quit();

  return value;
};

const find = (email) => {
  const result = _getValue(email);

  return result;
};

const create = async (email, refreshToken) => {
  await _setValue(email, refreshToken);
};

const update = async (email, newRefreshToken) => {
  await _setValue(email, newRefreshToken);
};

module.exports = {
  find,
  create,
  update,
};
