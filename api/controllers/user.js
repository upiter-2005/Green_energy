const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { dirname } = require("path");
const path = require("path");
const { fileURLToPath } = require("url");

const nameUpdate = async (req, res) => {
  try {
    const { name, surname } = req.body;

    const user = req.userId;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user,
      },
      {
        name: name,
        surname: surname,
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const contactUpdate = async (req, res) => {
  try {
    const { phone, telegram, whatsapp, facebook, instagram, twitter } = req.body;

    const user = req.userId;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user,
      },
      {
        phone,
        telegram,
        whatsapp,
        facebook,
        instagram,
        twitter,
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const passwordUpdate = async (req, res) => {
  try {
    const { inputCurrent, newPass } = req.body;

    const currentUser = await User.findOne({ _id: req.userId });
    const isPasswordCorrenct = await bcrypt.compare(inputCurrent, currentUser.password);
    if (!isPasswordCorrenct) {
      return res.json({ statusChange: false });
    }
    const hashNewPassword = await bcrypt.hash(newPass, 12);

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.userId,
      },
      {
        password: hashNewPassword,
      },
      { returnDocument: "after" },
    );
    console.log({ updatedUser, statusChange: true });
    res.json({ updatedUser, statusChange: true });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const avatarUpdate = async (req, res) => {
  try {
    console.log(req.userId);
    const userId = req.userId;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.avatar.name;
      //const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.avatar.mv(path.join(__dirname, "..", "uploads", fileName));
      user.avatar = fileName || "";
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const getUplinerInfo = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser.upliner) {
      return res.json({ message: "upliner not exist" });
    }

    const upliner = await User.findOne({ login: currentUser.upliner });

    res.json({ upliner });
  } catch (error) {
    res.json({ message: "Bad connection" });
  }
};

const getStructureUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    const users = await User.find(
      { upliner: currentUser.login },
      {
        login: 1,
        email: 1,
        status: 1,
        balance: 1,
        staking: 1,
        phone: 1,
        comand: 1,
        telegram: 1,
        whatsapp: 1,
        facebook: 1,
        instagram: 1,
        twitter: 1,
      },
    );
    res.json(users);
  } catch (e) {
    res.json({ message: "getStructureUsers not work!" });
  }
};

module.exports = {
  getUplinerInfo,
  avatarUpdate,
  passwordUpdate,
  contactUpdate,
  nameUpdate,
  getStructureUsers,
};
