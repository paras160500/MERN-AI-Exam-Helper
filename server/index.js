// ================================================================================
//                             Import and Init Statements
// ================================================================================

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// ================================================================================
//                             Logic and integrations Statements
// ================================================================================

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "🚀 Health is Good.",
    success: true,
  });
});

// Listening
app.listen(PORT, () => {
  console.log("Server Listening on ", PORT);
  //   Connection with DB
  connectDB();
});
