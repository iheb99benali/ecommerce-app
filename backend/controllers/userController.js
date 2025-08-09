const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { status: 401, message: "Invalid credentials" };

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        is_admin: user.is_admin,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({
      token,
      user: { email: user.email, is_admin: user.is_admin },
    });
  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json({ error: err.message });
    } else if (err.status === 401) {
      return res.status(401).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = { addUser, getUsers, loginUser };
