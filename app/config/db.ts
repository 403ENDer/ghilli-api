import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI!;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to mongoDb");
  })
  .catch((err) => {
    console.log("Failed to connect with MongoDb", err);
  });

export default mongoose;
