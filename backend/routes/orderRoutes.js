const express = require("express");

const {
  authenticateToken,
  verifyUser,
} = require("../middleware/authMiddleware");

const router = express.Router();
const {
  //   getOrder,
  createOrder,
  //   addToOrder,
  //   removeFromOrder,
  //   deleteOrder,
  //   updateOrderItem,
  //   getAllOrderItems,
} = require("../controllers/orderController");

//order
router.post("/create", authenticateToken, verifyUser, createOrder);
// router.get("/:user_id", authenticateToken, verifyUser, getOrder);

// //order items
// router.get("/items/:cart_id", authenticateToken, verifyUser, getAllOrderItems);
// router.post("/items/create", authenticateToken, verifyUser, addToOrder);
// router.delete(
//   "/items/delete/:cart_item_id",
//   authenticateToken,
//   verifyUser,
//   removeFromOrder
// );
// router.patch(
//   "/items/update/:cart_item_id",
//   authenticateToken,
//   verifyUser,
//   updateOrderItem
// );
module.exports = router;
