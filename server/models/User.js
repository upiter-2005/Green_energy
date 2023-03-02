import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  upliner: { type: String, default: "", required: false },
  login: { type: String, required: true, unique: true },
  name: { type: String, default: "" },
  surname: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  balance: { type: Number, default: 0 },
  projectTokens: { type: Number, default: 0 },
  wallet: { type: String, default: "0x00" },
  telegram: { type: String, default: "" },
  whatsapp: { type: String, default: "" },
  facebook: { type: String, default: "" },
  instagram: { type: String, default: "" },
  twitter: { type: String, default: "" },
  matrix: { type: Object, default: {} },
});

export default mongoose.model("User", userSchema);
