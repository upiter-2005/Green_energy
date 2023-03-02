import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoutes from "./routs/authRoutes.js";
import userRoutes from "./routs/userRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

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
