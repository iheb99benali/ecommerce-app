const express = require("express");
const router = express.Router();
const {
  getLatest,
  getProducts,
  getProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/latest", getLatest);
router.get("/:id", getProduct);

module.exports = router;
