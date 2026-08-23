// ================================================================================
//                             Import and Init Statements
// ================================================================================

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// ================================================================================
//                                  Function Statements
// ================================================================================

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect DB ✅");
  } catch (error) {
    console.log("Error in connecting DB ", error.message);
  }
};
