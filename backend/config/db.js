const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "66966146",
  database: "ecommapp",
});

module.exports = connection;
