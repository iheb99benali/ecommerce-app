const adminMessages = require("../models/adminContactModel");

const getMessages = async (req, res) => {
  try {
    const messages = await adminMessages.getAllMessages();
    res.json(messages);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateMessageStatus = async (req, res) => {
  try {
    const data = req.body;
    if (data.status === "reply") {
      data.status = "replied";
    } else if (data.status === "archive") {
      data.status = "archived";
    }
    const updatedMessage = await adminMessages.updateMessageStatusById(data);

    res.status(201).json({ message: "message updated", updatedMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await adminMessages.deleteMessageById(req.params.id);
    res
      .status(201)
      .json({ message: "message deleted", id: deletedMessage.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMessages, updateMessageStatus, deleteMessage };
