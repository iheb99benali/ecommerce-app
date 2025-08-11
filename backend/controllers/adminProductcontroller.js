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
      image_urls: [...new Set(image_urls)],
      is_active: true,
    });
    res.status(201).json({ message: "product created", id: prodData.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    let products = await adminProduct.getAllProducts();
    products = products.map((prod) => ({
      ...prod,
      price: parseFloat(prod.price),
      is_active: prod.is_active === 1 ? true : false,
    }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await adminProduct.updateProductById(req.body);

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    console.log("Deleting product with IDc:", req.params.id);
    const deletedProduct = await adminProduct.deleteProductById(req.params.id);
    res
      .status(201)
      .json({ message: "product deleted", id: deletedProduct.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
