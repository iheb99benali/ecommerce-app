const db = require("../config/db");

const createMessage = async (message_) => {
  const { userId, name, email, subject, message } = message_;
  console.log("model before ");

  const [rows] = await db.query(
    "INSERT INTO messages (user_id, name, email, subject, message) VALUES (?,?,?,?,?) ",
    [userId || null, name, email, subject, message]
  );
  console.log("model after ");

  return rows;
};

module.exports = {
  createMessage,
};
