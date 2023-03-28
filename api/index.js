const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const authRoutes = require("./routs/authRoutes.js");
const userRoutes = require("./routs/userRoutes.js");
const optionsRoutes = require("./routs/optionsRoutes.js");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/options", optionsRoutes);

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app has been started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
