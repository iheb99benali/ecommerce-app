const db = require("../config/db");

const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

const getLatestProducts = async () => {
  const [rows] = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC LIMIT 3"
  );
  return rows;
};

module.exports = { getLatestProducts, getAllProducts };
