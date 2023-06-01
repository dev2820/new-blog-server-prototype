const redis = require("async-redis");

const DB_NAME = "auth";
const client = redis.createClient();

const _setValue = async (key, value) => {
  await client.set(`${DB_NAME}:${key}`, value);
};

const _getValue = async (key) => {
  const value = await client.get(`${DB_NAME}:${key}`);

  return value;
};

const find = async (email) => {
  const result = await _getValue(email);

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
