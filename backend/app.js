const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/admin", adminRoutes);

module.exports = app;
