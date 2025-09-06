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

const getProductsByQueryParams = async ({ category, sort, search }) => {
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
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductsByQueryParams,
};
