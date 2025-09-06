const db = require("../config/db");

const getAllMessages = async () => {
  const [rows] = await db.query("SELECT * FROM Messages");
  return rows;
};

const updateMessageStatusById = async (msg) => {
  const { status, id } = msg;
  console.log(msg);
  const [result] = await db.query(
    "UPDATE Messages set status = ? WHERE message_id = ?",
    [status, id]
  );
  // return result;
  const [rows] = await db.query("SELECT * FROM Messages WHERE message_id = ?", [
    id,
  ]);
  return rows[0];
};

const deleteMessageById = async (id) => {
  const [result] = await db.query("DELETE FROM Messages WHERE id = ?", [id]);
  return result;
};

const getMessageByQueryParams = async ({ category, sort, search }) => {
  let query = "SELECT * FROM Messages WHERE 1=1";
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

  const [rows] = await db.query(query, params);
  return rows;
};

module.exports = {
  getAllMessages,
  deleteMessageById,
  updateMessageStatusById,
  getMessageByQueryParams,
};
