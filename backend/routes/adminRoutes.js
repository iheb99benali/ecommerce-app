const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminProductcontroller");
const {
  authenticateToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

router.get("/products", authenticateToken, verifyAdmin, getProducts);
router.post("/products/create", authenticateToken, verifyAdmin, addProduct);
router.put("/products/update", authenticateToken, verifyAdmin, updateProduct);
router.delete(
  "/products/delete/:id",
  authenticateToken,
  verifyAdmin,
  deleteProduct
);

module.exports = router;

//api/users/
