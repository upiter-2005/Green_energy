const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { dirname } = require("path");
const path = require("path");
const { fileURLToPath } = require("url");

const transferBalance = async (req, res) => {
  try {
    const { amount, recepient } = req.body;
    const from = await User.findOne({ _id: req.userId });
    if (from.balance >= amount) {
      const toUser = await User.findOne({ login: recepient });
      if (!toUser) {
        return res.json({ message: "Такого пользователя не существует!" });
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $inc: { balance: -amount },
        },
        { returnDocument: "after" },
      );

      await User.findOneAndUpdate(
        { login: recepient },
        {
          $inc: { balance: +amount },
        },
        { returnDocument: "after" },
      );
      res.json({ updatedUser });
    } else {
      return res.json({ message: "Не достаточный баланс!" });
    }
  } catch (e) {
    res.json({ message: "No transfer" });
  }
};

const updateBalanceAdmin = async (req, res) => {
  try {
    const { userId, balance, staking, is_active } = req.body;
    console.log(userId, balance);
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: { balance, staking, is_active },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const updateTotalAwards = async (req, res) => {
  try {
    const { login, totalAwards } = req.body;
    console.log(login, totalAwards);
    const updatedUser = await User.findOneAndUpdate(
      {
        login: login,
      },
      {
        $set: { totalAwards },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};
const updateRefAwards = async (req, res) => {
  try {
    const { login, refAwards } = req.body;
    console.log(login, refAwards);
    const updatedUser = await User.findOneAndUpdate(
      {
        login: login,
      },
      {
        $set: { refAwards },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const updateReinvestBalance = async (req, res) => {
  try {
    const { login, balanceReinvest } = req.body;
    console.log(login, balanceReinvest);
    let updatedUser = null;
    if (balanceReinvest == 50) {
      updatedUser = await User.findOneAndUpdate(
        {
          login: login,
        },
        {
          $set: { balanceReinvest: 50 },
        },
        { returnDocument: "after" },
      );
    } else {
      updatedUser = await User.findOneAndUpdate(
        {
          login: login,
        },
        {
          $inc: { balanceReinvest },
        },
        { returnDocument: "after" },
      );
    }

    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const updateCashbackBalance = async (req, res) => {
  try {
    const { login, cashbackBalance } = req.body;
    console.log(login, cashbackBalance);
    let updatedUser = null;
    if (cashbackBalance == 30) {
      updatedUser = await User.findOneAndUpdate(
        {
          login,
        },
        {
          $set: { cashback_balance: 30 },
        },
        { returnDocument: "after" },
      );
    } else {
      updatedUser = await User.findOneAndUpdate(
        {
          login,
        },
        {
          $inc: { cashback_balance: cashbackBalance },
        },
        { returnDocument: "after" },
      );
    }

    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const updateCashbackReinvest = async (req, res) => {
  try {
    const { login, cashbackReinvest } = req.body;
    console.log(login, cashbackReinvest);
    let updatedUser = null;
    if (cashbackReinvest == 50) {
      updatedUser = await User.findOneAndUpdate(
        {
          login: login,
        },
        {
          $set: { cashback_reinvest: 50 },
        },
        { returnDocument: "after" },
      );
    } else {
      updatedUser = await User.findOneAndUpdate(
        {
          login: login,
        },
        {
          $inc: { cashback_reinvest: cashbackReinvest },
        },
        { returnDocument: "after" },
      );
    }

    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const activeOn = async (req, res) => {
  try {
    const user = req.userId;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user,
      },
      {
        $set: { is_active: true },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const nameUpdate = async (req, res) => {
  try {
    const { name, surname, payeer, advcash, wallet } = req.body;

    const user = req.userId;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user,
      },
      {
        name,
        surname,
        payeer,
        advcash,
        wallet,
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

const updateBalance = async (req, res) => {
  try {
    const { login, balance } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        login,
      },
      {
        $inc: {
          balance: balance,
        },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (e) {
    res.json({ message: e });
  }
};

const balanceReinvestZero = async (req, res) => {
  try {
    const { idUser } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: idUser,
      },
      {
        $set: {
          balanceReinvest: 0,
          cashback_reinvest: 0,
        },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (e) {
    res.json({ message: e });
  }
};

const pocketPlus = async (req, res) => {
  try {
    const { idUser } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: idUser,
      },
      {
        $inc: {
          qtyPocket: 1,
        },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (e) {
    res.json({ message: e });
  }
};
const balanceMinus = async (req, res) => {
  try {
    const { idUser, minusBalance } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: idUser,
      },
      {
        $inc: {
          balance: -minusBalance,
        },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (e) {
    res.json({ message: e });
  }
};
const tokenPlus = async (req, res) => {
  try {
    const { idUser } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: idUser,
      },
      {
        $inc: {
          tokens: 0.1,
        },
      },
      { returnDocument: "after" },
    );
    console.log(updatedUser);
    res.json({ updatedUser });
  } catch (e) {
    res.json({ message: e });
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

const getUserByLogin = async (req, res) => {
  try {
    const { login } = req.body;

    const user = await User.findOne({ login });

    res.json({ user });
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
        is_active: 1,
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (e) {
    res.json({ message: "Not denie" });
  }
};

module.exports = {
  transferBalance,
  getUplinerInfo,
  avatarUpdate,
  passwordUpdate,
  contactUpdate,
  nameUpdate,
  getStructureUsers,
  getAllUsers,
  getUserByLogin,
  updateBalance,
  updateReinvestBalance,
  updateCashbackReinvest,
  updateCashbackBalance,
  updateTotalAwards,
  updateRefAwards,
  activeOn,
  updateBalanceAdmin,
  balanceMinus,
  tokenPlus,
  pocketPlus,
  balanceReinvestZero,
};
