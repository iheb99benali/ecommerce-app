const cartData = require("../models/cartModel");

//cart controllers
const getCart = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(req.params);
    const cart = await cartData.getCartByUserId(user_id);
    res
      .status(200)
      .json({ message: "cart fetched successfully", cart: cart[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

const createCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    const cart = await cartData.createCartByUserId(user_id);
    res.status(201).json({ message: "cart created", id: cart.insertId });
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
    console.log("in cart/items/create");
    const { user_id, cart_id, product_id, quantity } = req.body;
    const result = await cartData.addItemToCart({
      user_id,
      cart_id,
      product_id,
      quantity,
    });
    res
      .status(200)
      .json({ message: "item added to cart", id: result.insertId });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add item  to cart", message: err.message });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { cart_item_id } = req.params;
    const { cart_id } = req.query;

    console.log("removeFromCart id:", cart_item_id);
    const cart = await cartData.removeItemFromCart(cart_item_id, cart_id);

    res.status(200).json({ message: "item deleted from cart", cart: cart });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item  to cart" });
  }
};
const updateCartItem = async (req, res) => {
  try {
    const { cart_item_id } = req.params;
    const { quantity, cart_id } = req.body;

    const cart = await cartData.updateCartItem({
      cart_item_id,
      quantity,
      cart_id,
    });

    console.log("cart after update in cart controller", cart);
    res.status(200).json({ message: "item updated in cart", cart: cart });
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
