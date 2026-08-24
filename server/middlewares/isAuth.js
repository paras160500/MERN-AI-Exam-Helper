// ================================================================================
//                             Import and Init Statements
// ================================================================================

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ================================================================================
//                              Middleware Statements
// ================================================================================

export const isAuth = async (req, res, next) => {
  try {
    // Getting the token
    let { token } = req.cookies;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Auth token not found.",
      });
    }
    // Verify the token
    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
    // Setting up userId
    req.userId = verifyToken.userId;
    // Calling next
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `isAuth Error : ${error}`,
    });
  }
};
