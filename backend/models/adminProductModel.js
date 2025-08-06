const db = require("../config/db");

const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

const createProduct = async (prodData) => {
  const { name, description, price, stock, category, image_urls, is_active } =
    prodData;
  const [result] = await db.query(
    "INSERT INTO products ( name, description, price, stock, category, image_urls, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      description,
      price,
      stock,
      category,
      JSON.stringify(image_urls),
      is_active,
    ]
  );
};

module.exports = { createProduct, getAllProducts };
