const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({
      username: username,
      password: hashedPassword,
      email: email,
    });
    await user.save();

    res.json({ message: "Saved Successfully." });
  } catch (ee) {
    res.status(500).json({ error: "Error in registration - " + ee.message });
  }
});

//Display Users
router.get("/", async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

module.exports = router;
