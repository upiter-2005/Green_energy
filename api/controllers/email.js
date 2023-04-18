const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const recoverPassword = async (req, res) => {
  try {
    const { from, text } = req.body;
    const user = await User.findOne({ _id: req.userId });
    const transporter = nodemailer.createTransport({
      port: 587, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: "pavel470245@gmail.com",
        pass: "tkpizlqqrtlpfbwb",
      },
      secure: false,
      //   service: "gmail",
    });

    const mailOptions = {
      from: "KPD <pavel470245@gmail.com>",
      to: "herrmannoliver862@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res.json({ message: "Почта успешно отправлена!" });
  } catch (e) {
    res.json({ message: "Ошибка связи!" });
  }
};

module.exports = {
  recoverPassword,
};
