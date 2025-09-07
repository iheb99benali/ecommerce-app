const db = require("../config/db");

const createOrderByUserId = async ({ userId, totalAmount, shipping }) => {
  const [result] = await db.query(
    "INSERT INTO orders (user_id,total_amount,shipping_address) VALUES (?,?,?)",
    [userId, totalAmount, shipping]
  );
  return result;
};

// const getCartByUserId = async (user_id) => {
//   const [rows] = await db.query(
//     "SELECT * FROM cart WHERE user_id = ?",
//     user_id
//   );
//   return rows;
// };

// const deleteCartByUserId = async (user_id) => {
//   console.log("deleting:", user_id);
//   const [result] = await db.query(
//     "DELETE FROM cart WHERE (user_id) = (?)",
//     user_id
//   );
//   return result;
// };
// const addItemToCart = async ({ cart_id, product_id, quantity }) => {
//   const [result] = await db.query(
//     "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)",
//     [cart_id, product_id, quantity]
//   );
//   return result;
// };
// const removeItemFromCart = async (cart_item_id, cart_id) => {
//   console.log("deleting:", cart_item_id);
//   const [result] = await db.query(
//     "DELETE FROM cart_items WHERE (cart_item_id) = (?)",
//     cart_item_id
//   );
//   const rows = await getAllCartItems(cart_id);
//   console.log(rows.length);
//   if (rows.length === 0) {
//     await db.query("DELETE FROM cart WHERE (cart_id) = (?)", cart_id);
//   }
//   return rows;
// };

// const updateCartItem = async ({ cart_item_id, quantity, cart_id }) => {
//   const [result] = await db.query(
//     "UPDATE cart_items set quantity = ? WHERE cart_item_id = ?",
//     [quantity, cart_item_id]
//   ); //TODO: check correct logic with quantity
//   const rows = await getAllCartItems(cart_id);
//   return rows;
// };

// const getAllCartItems = async (cart_id) => {
//   const [rows] = await db.query(
//     `SELECT
//         ci.cart_item_id,
//         ci.product_id,
//         ci.quantity,
//         p.name AS product_name,
//         p.price AS unit_price,
//         (ci.quantity * p.price) AS total_price_per_item,
//         JSON_UNQUOTE(JSON_EXTRACT(p.image_urls, '$[0]')) AS first_image
//      FROM cart_items ci
//      JOIN products p ON ci.product_id = p.id
//      WHERE ci.cart_id = ?`,
//     [cart_id]
//   );
//   return rows;
// };

module.exports = {
  createOrderByUserId,
  //   getCartByUserId,
  //   deleteCartByUserId,
  //   addItemToCart,
  //   removeItemFromCart,
  //   updateCartItem,
  //   getAllCartItems,
};
