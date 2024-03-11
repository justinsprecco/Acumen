import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { connect } = mongoose;
const { MONGO_URI } = process.env;

async function dbConnect() {
  try {
    await connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default dbConnect;
