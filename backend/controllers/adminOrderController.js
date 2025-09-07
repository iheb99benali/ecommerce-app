const adminOrders = require("../models/adminOrderModel");

const getOrders = async (req, res) => {
  try {
    console.log("before admin controller");
    const Orders = await adminOrders.getAllOrders();
    console.log("after controller:", Orders);
    res.json(Orders);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.Order });
    } else {
      res.status(500).json({ error: error.Order });
    }
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const data = req.body;
    if (data.status === "reply") {
      data.status = "replied";
    } else if (data.status === "archive") {
      data.status = "archived";
    }
    const updatedOrder = await adminOrders.updateOrderStatusById(data);

    res.status(201).json({ message: "Order updated", updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.Order });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await adminOrders.deleteOrderById(req.params.id);
    res
      .status(201)
      .json({ message: "Order deleted", id: deletedOrder.insertId });
  } catch (error) {
    res.status(500).json({ error: error.Order });
  }
};

module.exports = { getOrders, updateOrderStatus, deleteOrder };
