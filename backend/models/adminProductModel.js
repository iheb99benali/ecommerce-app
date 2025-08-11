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
  return result;
};

const updateProductById = async (prodData) => {
  const {
    name,
    description,
    price,
    stock,
    category,
    image_urls,
    is_active,
    id,
  } = prodData;
  const [result] = await db.query(
    "UPDATE products set name = ?, description = ?, price = ?, stock = ?, category = ?, image_urls = ?, is_active = ? WHERE id = ?",
    [
      name,
      description,
      price,
      stock,
      category,
      JSON.stringify(image_urls),
      is_active,
      id,
    ]
  );
  // return result;
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows;
};

const deleteProductById = async (id) => {
  const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
  return result;
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
};
