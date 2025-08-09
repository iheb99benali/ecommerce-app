const adminProduct = require("../models/adminProductModel");

const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image_urls, is_active } =
      req.body;

    const prodData = await adminProduct.createProduct({
      name,
      description,
      price,
      stock,
      category,
      image_urls,
      is_active: false,
    });
    res.status(201).json({ message: "product created", prodData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await adminProduct.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const products = await product.updateProduct();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateProduct, addProduct, getProducts };
