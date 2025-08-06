const db = require("../config/db");

const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

const createUser = async (userData) => {
  const { name, surname, email, password, is_admin } = userData;
  const [result] = await db.query(
    "INSERT INTO users (name, surname, email, password, is_admin) VALUES (?, ?, ?, ?, ?)",
    [name, surname, email, password, is_admin]
  );
};

const findByEmail = async (email) => {
  const [user] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return user[0];
};

module.exports = { createUser, getAllUsers, findByEmail };
