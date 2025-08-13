const product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    console.log("search", search);
    if (category || sort || search) {
      const products = await product.getProductsByFilter({
        category,
        sort,
        search,
      });
      if (products.length < 1) {
        throw {
          status: 404,
          message: "couldn't find the product your looking for",
        };
      }
      res.json(products);
    }

    const products = await product.getAllProducts();
    res.json(products);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    }
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
