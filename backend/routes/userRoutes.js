const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  loginUser,
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");

router.get("/", getUsers);
router.get("/user", authenticateToken, (req, res) => {
  res.json(req.user);
});

router.post("/", addUser);
router.post("/login", loginUser);

module.exports = router;
