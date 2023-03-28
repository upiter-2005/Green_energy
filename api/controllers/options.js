const Options = require("../models/Options.js");
const mongoose = require("mongoose");

const getTree = async (req, res) => {
  try {
    const options = await Options.find();
    res.json({ options });
  } catch (e) {
    res.json({ message: "Not denie" });
  }
};

const setTree = async (req, res) => {
  try {
    const { id, tree } = req.body;

    const options = await Options.findOneAndUpdate(
      {
        _id: id,
      },
      {
        tree,
      },
      { returnDocument: "after" },
    );

    // const options = await Options.findOneAndUpdate({ _id: id }, { tree }, { new: true });
    res.json({ options });
  } catch (e) {
    res.json({ message: "Not denie" });
  }
};

module.exports = {
  getTree,
  setTree,
};
