// ================================================================================
//                             Import and Init Statements
// ================================================================================

import { UserModel } from "../models/user.model.js";
import { getToken } from "../utils/token.js";

// ================================================================================
//                             Signup function Statements
// ================================================================================

// Google Authentication Function
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        name,
        email,
      });
    }
    let token = await getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      samesite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Google Signup Error ${error}`,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Logout Error ${error}`,
    });
  }
};
