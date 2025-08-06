const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
} = require("../controllers/adminProductcontroller");

router.post("/", addProduct);
router.get("/", getProducts);

module.exports = router;

//api/users/
