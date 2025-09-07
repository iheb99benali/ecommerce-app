const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminProductcontroller");

const {
  getMessages,
  deleteMessage,
  updateMessageStatus,
} = require("../controllers/adminContactController");

const {
  getOrders,
  deleteOrder,
  updateOrderStatus,
} = require("../controllers/adminOrderController");

const {
  authenticateToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

//products
router.get("/products", authenticateToken, verifyAdmin, getProducts);
router.post("/products/create", authenticateToken, verifyAdmin, addProduct);
router.put("/products/update", authenticateToken, verifyAdmin, updateProduct);
router.delete(
  "/products/delete/:id",
  authenticateToken,
  verifyAdmin,
  deleteProduct
);

//contact
router.get("/contact", authenticateToken, verifyAdmin, getMessages);
router.delete("/contact/delete", authenticateToken, verifyAdmin, deleteMessage);
router.patch(
  "/contact/update",
  authenticateToken,
  verifyAdmin,
  updateMessageStatus
);

//orders
router.get("/orders", authenticateToken, verifyAdmin, getOrders);
router.delete("/orders/delete", authenticateToken, verifyAdmin, deleteOrder);
router.patch(
  "/orders/update",
  authenticateToken,
  verifyAdmin,
  updateOrderStatus
);

module.exports = router;

//api/users/
