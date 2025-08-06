const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  loginUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", addUser);
router.post("/login", loginUser);

module.exports = router;

//api/users/
