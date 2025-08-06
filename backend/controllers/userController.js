const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, surname, password, email, is_admin } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = await User.createUser({
      name,
      surname,
      email,
      password: hashedPassword,
      is_admin,
    });
    res.status(201).json({ message: "user created", userData });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "EMAIL_IN_USE" });
    }
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    console.log("login successful!!");
  } catch (err) {}
};

module.exports = { addUser, getUsers, loginUser };
