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

const find = (id, provider) => {
  const key = `${id}-${provider}`;
  const result = _getValue(key);

  return result;
};

const create = async (id, provider, refreshToken) => {
  const key = `${id}-${provider}`;
  await _setValue(key, refreshToken);
};

const update = async (id, provider, newRefreshToken) => {
  const key = `${id}-${provider}`;
  await _setValue(key, newRefreshToken);
};

module.exports = {
  find,
  create,
  update,
};
