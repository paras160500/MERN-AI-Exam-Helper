import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generating Token for user
export const getToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log("Token Error : ", error);
  }
};
