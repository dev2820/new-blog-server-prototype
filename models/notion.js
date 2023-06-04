const mysql = require("mysql2");

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
};

const TABLE_NAME = "Notion";
const pool = mysql.createPool(config);

const find = async (email) => {
  const [rows] = await pool
    .promise()
    .query(`SELECT * from ${TABLE_NAME} WHERE email=?`, [email]);

  return rows.length > 0 ? rows[0] : null;
};

const create = async (email, accessToken) => {
  await pool
    .promise()
    .query(`INSERT INTO ${TABLE_NAME} (email,access_token) VALUES (?,?)`, [
      email,
      accessToken,
    ]);
};

const update = async (email, accessToken) => {
  await pool
    .promise()
    .query(`UPDATE ${TABLE_NAME} SET code=? WHERE email=?`, [
      accessToken,
      email,
    ]);
};
module.exports = {
  find,
  create,
  update,
};
