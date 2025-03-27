import express from "express";
import mongoose from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
app.listen(PORT, () => {
  mongoose.connect;
  console.log(`Server is running on ${HOST}:${PORT}`);
});
