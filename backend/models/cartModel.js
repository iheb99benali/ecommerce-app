const db = require("../config/db");

const getCartByUserId = async (user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM cart WHERE user_id = ?",
    user_id
  );
  return rows;
};

const createCartByUserId = async (user_id) => {
  const [result] = await db.query(
    "INSERT INTO cart (user_id) VALUES (?)",
    user_id
  );
  return result;
};
const deleteCartByUserId = async (user_id) => {
  console.log("deleting:", user_id);
  const [result] = await db.query(
    "DELETE FROM cart WHERE (user_id) = (?)",
    user_id
  );
  return result;
};
const addItem = async ({ cart_id, product_id, quantity }) => {
  const [result] = await db.query(
    "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)",
    [cart_id, product_id, quantity]
  );
  return result;
};
const removeItemFromCart = async (cart_item_id) => {
  console.log("deleting:", cart_item_id);
  const [result] = await db.query(
    "DELETE FROM cart_items WHERE (cart_item_id) = (?)",
    cart_item_id
  );
  return result;
};

const updateCartItem = async ({ quantity, cart_item_id, product_id }) => {
  const [result] = await db.query(
    "UPDATE cart_items set quantity = quantity + ? WHERE cart_item_id = ? AND product_id = ?",
    [quantity, cart_item_id, product_id]
  ); //TODO: check correct logic with quantity
  console.log(result);
  return result;
};

const getAllCartItems = async (cart_id) => {
  const [rows] = await db.query(
    `SELECT 
        ci.cart_item_id,
        ci.product_id,
        ci.quantity,
        p.name AS product_name,
        p.price AS unit_price,
        (ci.quantity * p.price) AS total_price_per_item
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = ?`,
    [cart_id]
  );
  return rows;
};

module.exports = {
  getCartByUserId,
  createCartByUserId,
  deleteCartByUserId,
  addItem,
  removeItemFromCart,
  updateCartItem,
  getAllCartItems,
};
