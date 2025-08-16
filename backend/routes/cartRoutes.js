const express = require("express");

const {
  authenticateToken,
  verifyUser,
} = require("../middleware/authMiddleware");

const router = express.Router();
const {
  getCart,
  createCart,
  addToCart,
  removeFromCart,
  deleteCart,
  updateCartItem,
  getAllCartItems,
} = require("../controllers/cartController");

//cart
router.post("/create", authenticateToken, verifyUser, createCart);
router.get("/:user_id", authenticateToken, verifyUser, getCart);
router.delete("/delete/:user_id", authenticateToken, verifyUser, deleteCart); //TODO: migh change to cart_id

//cart items
router.get("/items/get", authenticateToken, verifyUser, getAllCartItems);
router.post("/items/create", authenticateToken, verifyUser, addToCart);
router.delete(
  "/items/delete/:cart_item_id",
  authenticateToken,
  verifyUser,
  removeFromCart
);
router.put(
  "/item/update/:cart_item_id",
  authenticateToken,
  verifyUser,
  updateCartItem
);
module.exports = router;
