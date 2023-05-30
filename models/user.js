const mysql = require("mysql2");

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
};

const pool = mysql.createPool(config);

const find = async (provider, id) => {
  const [rows] = await pool
    .promise()
    .query("SELECT * from Users WHERE provider=? and id=?", [provider, id]);

  return rows.length > 0 ? rows[0] : null;
};

const create = async (name, id, email, provider) => {
  const result = await pool
    .promise()
    .query("INSERT INTO Users (name,id,email,provider) VALUES (?,?,?,?)", [
      name,
      id,
      email,
      provider,
    ]);

  return result;
};
module.exports = {
  find,
  create,
};
