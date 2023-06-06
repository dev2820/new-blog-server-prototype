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

const _removeValue = async (key) => {
  await client.del(`${DB_NAME}:${key}`);
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

const remove = async (email) => {
  await _removeValue(email);
};

module.exports = {
  find,
  create,
  update,
  remove,
};
