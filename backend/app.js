const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes); // API path
app.use("/api/users/login", userRoutes); // API path

module.exports = app;
