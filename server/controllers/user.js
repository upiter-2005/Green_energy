import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const nameUpdate = async (req, res) => {
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

export const contactUpdate = async (req, res) => {
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

export const passwordUpdate = async (req, res) => {
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

export const avatarUpdate = async (req, res) => {
  try {
    console.log(req.userId);
    const userId = req.userId;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.avatar.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.avatar.mv(path.join(__dirname, "..", "uploads", fileName));
      user.avatar = fileName || "";
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.json({ message: "Error!!!" });
  }
};

export const getUplinerInfo = async (req, res) => {
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
