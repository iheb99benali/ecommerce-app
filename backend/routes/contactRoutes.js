const express = require("express");

const router = express.Router();
const { sendMessage } = require("../controllers/contactController");

router.post("/create", sendMessage);

module.exports = router;
