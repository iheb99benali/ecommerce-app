const messageData = require("../models/contactModel");

const sendMessage = async (req, res) => {
  console.log("hi");
  console.log(req.body);
  try {
    const message = req.body;
    console.log("controller before ");
    console.log(message);
    const result = await messageData.createMessage(message);
    console.log("controller after ");
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage };
