const db = require("../config/db");

const getAllOrders = async () => {
  const [rows] = await db.query(`
    SELECT 
      o.order_id     AS id,
      CONCAT(u.name, ' ', u.surname) AS customer,
      o.created_at   AS date,
      o.order_status AS status,
      o.total_amount AS amount
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `);
  return rows;
};

const updateOrderStatusById = async (msg) => {
  const { status, id } = msg;
  console.log(msg);
  const [result] = await db.query(
    "UPDATE orders set status = ? WHERE order_id = ?",
    [status, id]
  );
  // return result;
  const [rows] = await db.query("SELECT * FROM orders WHERE order_id = ?", [
    id,
  ]);
  return rows[0];
};

const deleteOrderById = async (id) => {
  const [result] = await db.query("DELETE FROM orders WHERE id = ?", [id]);
  return result;
};

//TODO:
// const getMessageByQueryParams = async ({ category, sort, search }) => {
//   let query = "SELECT * FROM orders WHERE 1=1";
//   let params = [];

//   if (category) {
//     query += " AND category = ?";
//     params.push(category);
//   }
//   if (search) {
//     query += " AND name LIKE ? OR category LIKE ? OR description LIKE ?";
//     params.push(`%${search}%`, `%${search}%`, `%${search}%`);
//   }

//   console.log(sort);

//   const [rows] = await db.query(query, params);
//   return rows;
// };

module.exports = {
  getAllOrders,
  updateOrderStatusById,
  deleteOrderById,
  //   getMessageByQueryParams,
};
