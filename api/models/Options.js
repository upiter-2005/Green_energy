const mongoose = require("mongoose");

const optionsSchema = new mongoose.Schema({
  tree: { type: String, default: "", required: false },
  jackpot: { type: Number, default: 0 },
});

module.exports = mongoose.model("Options", optionsSchema);
