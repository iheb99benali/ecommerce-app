const productData = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    if (category || sort || search) {
      const products = await productData.getProductsByFilter({
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

    const products = await productData.getAllProducts();
    res.json(products);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productData.getProductById(id);
    console.log(product);
    res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
const getLatest = async (req, res) => {
  try {
    const products = await productData.getLatestProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getLatest, getProducts, getProduct };
