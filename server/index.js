// ================================================================================
//                             Import and Init Statements
// ================================================================================

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import notesRouter from "./routes/generate.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import pdfRouter from "./routes/pdf.routes.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// ================================================================================
//                             Logic and integrations Statements
// ================================================================================

// Adding middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());
app.use(cookieParser());

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "🚀 Health is Good.",
    success: true,
  });
});

// Adding the Auth Routes
app.use("/api/auth", authRouter);
// Adding user Routes
app.use("/api/user", userRouter);
// Adding notes routes
app.use("/api/notes", notesRouter);
// Adding pdf routes
app.use("/api/pdf", pdfRouter);

// Listening
app.listen(PORT, () => {
  console.log("Server Listening on ", PORT);
  //   Connection with DB
  connectDB();
});
