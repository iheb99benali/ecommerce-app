const express = require("express");
const router = express.Router();
const { getLatest, getProducts } = require("../controllers/productController");

router.get("/", getProducts);
router.get("/latest", getLatest);

module.exports = router;
