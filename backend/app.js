const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");

app.use("/api/users", userRoutes); // API path
app.use("/api/users/login", userRoutes); // API path

app.use("/api/admin-products", adminProductRoutes); // API path

module.exports = app;
