const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  updateProduct,
} = require("../controllers/adminProductcontroller");

router.post("/", addProduct);
router.get("/", getProducts);
router.put("/update", updateProduct);

module.exports = router;

//api/users/
