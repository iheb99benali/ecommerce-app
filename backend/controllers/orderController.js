const orderData = require("../models/orderModel");

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const order_ = await orderData.createOrderByUserId(order);
    res.status(201).json({ message: "order created", id: order_.insertId });
  } catch (err) {
    console.log(err);

    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Failed to create order" });
    }
  }
};

//order controllers
// const getOrder = async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     console.log(req.params);
//     const order = await orderData.getOrderByUserId(user_id);
//     res
//       .status(200)
//       .json({ message: "order fetched successfully", order: order[0] });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch order" });
//   }
// };

// const deleteOrder = async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const result = await orderData.deleteOrderByUserId(user_id);
//     res.status(204).json({ message: "product created", id: result.insertId });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete order" });
//   }
// };

//***********order item controllers
// const getAllOrderItems = async (req, res) => {
//   try {
//     const { order_id } = req.params;
//     console.log(req.params);
//     const order = await orderData.getAllOrderItems(order_id);
//     res
//       .status(200)
//       .json({ message: "order fetched successfully", order: order });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch order" });
//   }
// };

// const addToOrder = async (req, res) => {
//   try {
//     console.log("in order/items/create");
//     const { user_id, order_id, product_id, quantity } = req.body;
//     const result = await orderData.addItemToOrder({
//       user_id,
//       order_id,
//       product_id,
//       quantity,
//     });
//     res
//       .status(200)
//       .json({ message: "item added to order", id: result.insertId });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: "Failed to add item  to order", message: err.message });
//   }
// };
// const removeFromOrder = async (req, res) => {
//   try {
//     const { order_item_id } = req.params;
//     const { order_id } = req.query;

//     console.log("removeFromOrder id:", order_item_id);
//     const order = await orderData.removeItemFromOrder(order_item_id, order_id);

//     res.status(200).json({ message: "item deleted from order", order: order });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add item  to order" });
//   }
// };
// const updateOrderItem = async (req, res) => {
//   try {
//     const { order_item_id } = req.params;
//     const { quantity, order_id } = req.body;

//     const order = await orderData.updateOrderItem({
//       order_item_id,
//       quantity,
//       order_id,
//     });

//     console.log("order after update in order controller", order);
//     res.status(200).json({ message: "item updated in order", order: order });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to add item  to order" });
//   }
// };

module.exports = {
  createOrder,
  //   getAllOrderItems,
  //   getOrder,
  //   addToOrder,
  //   removeFromOrder,
  //   deleteOrder,
  //   updateOrderItem,
};
