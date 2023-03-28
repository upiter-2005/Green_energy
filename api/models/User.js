const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    upliner: { type: String, default: "", required: false },
    login: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    surname: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    balance: { type: Number, default: 0 },
    balanceReinvest: { type: Number, default: 0 },
    cashback_balance: { type: Number, default: 0 },
    cashback_reinvest: { type: Number, default: 0 },
    refAwards: { type: Number, default: 0 },
    totalAwards: { type: Number, default: 0 },
    staking: { type: Number, default: 5 },
    status: { type: Boolean, default: false },
    comand: { type: Number, default: 0 },
    tokens: { type: Number, default: 0.1 },
    wallet: { type: String, default: "0x00" },
    payeer: { type: String, default: "" },
    advcash: { type: String, default: "" },
    telegram: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    is_active: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
