const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const register = async (req, res) => {
  try {
    const { upliner, login, email, phone, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.json({ message: "User already exist" });
    }

    const hashPass = await bcrypt.hash(password, 12);

    const newUser = new User({
      upliner,
      login,
      email,
      phone,
      password: hashPass,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    const uplinerData = await User.findOneAndUpdate({ login: upliner }, { $inc: { comand: 1 } });

    res.json({ newUser, token, message: "Вы успешно зарегистрировались!" });
  } catch (error) {
    res.json({ mesage: "Register Error !!" });
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User doesn't not exist" });
    }

    const isPasswordCorrenct = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrenct) {
      return res.json({ message: "Password is not correct" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ token, user, message: "Вы вошли в систему" });
  } catch (error) {
    res.json({ message: "Login error!" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({ message: "User does not exist" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    res.json({ user, token, message: "You have been auth" });
  } catch (error) {
    res.json({ message: "Access is denied" });
  }
};

const checkUpliner = async (req, res) => {
  try {
    const { login } = req.body;
    const isUserExist = await User.findOne({ login });
    if (!isUserExist) {
      return res.json({ message: "not such user" });
    }
    res.json(isUserExist);
  } catch (e) {
    res.json({ message: "not connect" });
  }
};
module.exports = {
  getMe,
  login,
  register,
  checkUpliner,
};
