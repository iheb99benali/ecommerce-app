const db = require("../config/db");

const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

const getProductById = async (id) => {
  console.log(id);
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  console.log(rows);
  return rows[0];
};

const getLatestProducts = async () => {
  const [rows] = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC LIMIT 3"
  );
  return rows;
};

const getProductsByFilter = async ({ category, sort, search }) => {
  let query = "SELECT * FROM products WHERE 1=1";
  let params = [];

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }
  if (search) {
    query += " AND name LIKE ? OR category LIKE ? OR description LIKE ?";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  console.log(sort);
  if (sort === "Price: Low to High") query += " ORDER BY price ASC";
  else if (sort === "Price: High to Low") query += " ORDER BY price DESC";
  else if (sort === "Newest Arrivals") query += " ORDER BY created_at DESC";
  else if (sort === "Oldest") query += " ORDER BY created_at ASC";
  else if (sort === "Alphabetical: A to Z") query += " ORDER BY name ASC";
  else if (sort === "Alphabetical: Z to A") query += " ORDER BY name DESC";

  console.log("query:", query);
  console.log("params", params);
  const [rows] = await db.query(query, params);
  return rows;
};

module.exports = {
  getLatestProducts,
  getProductById,
  getAllProducts,
  getProductsByFilter,
};
