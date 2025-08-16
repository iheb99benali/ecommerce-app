const cartData = require("../models/cartModel");

//cart controllers
const getCart = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(req.params);
    const cart = await cartData.getCartByUserId(user_id);
    res.status(200).json({ message: "cart fetched successfully", cart: cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

const createCart = async (req, res) => {
  try {
    console.log("in cart cont");
    const { user_id } = req.body;
    const cart = await cartData.createCartByUserId(user_id);
    console.log(cart);
    res.status(201).json({ message: "product created", id: cart.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Failed to create cart" });
    }
  }
};

const deleteCart = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await cartData.deleteCartByUserId(user_id);
    res.status(204).json({ message: "product created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete cart" });
  }
};

//cart item controllers
const getAllCartItems = async (req, res) => {
  try {
    const { cart_id } = req.params;
    console.log(req.params);
    const cart = await cartData.getAllCartItems(cart_id);
    res.status(200).json({ message: "cart fetched successfully", cart: cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { cart_id, product_id, quantity } = req.body;
    const result = await cartData.addItem({ cart_id, product_id, quantity });
    res
      .status(200)
      .json({ message: "item added to cart", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item  to cart" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { cart_item_id } = req.params;
    const result = await cartData.removeItemFromCart(cart_item_id);
    res.status(200).json({ message: "item deleted cart", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item  to cart" });
  }
};
const updateCartItem = async (req, res) => {
  try {
    const { cart_item_id } = req.params;
    const { product_id, quantity } = req.body;
    const result = await cartData.updateCartItem({
      quantity,
      cart_item_id,
      product_id,
    });

    res.status(200).json({ message: "item updated in cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item  to cart" });
  }
};

module.exports = {
  getAllCartItems,
  getCart,
  createCart,
  addToCart,
  removeFromCart,
  deleteCart,
  updateCartItem,
};
