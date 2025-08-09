const product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const products = await product.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLatest = async (req, res) => {
  try {
    const products = await product.getLatestProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getLatest, getProducts };
