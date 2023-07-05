import mongoose from "mongoose";
import { config } from "dotenv";

config();

const mongouri = process.env.MONGO_URI;

export const connectDB = () => {
  mongoose
    .connect(mongouri)
    .then(() => console.log("Database Connected with MongoDB"))
    .catch((e) => console.log("Failed to connect to MongoDB:", e));
};
