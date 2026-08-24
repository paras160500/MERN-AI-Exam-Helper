// ================================================================================
//                             Import and Init Statements
// ================================================================================

import { UserModel } from "../models/user.model.js";

// ================================================================================
//                          Getting Current user Statements
// ================================================================================

export const getCurrentUser = async (req, res) => {
  try {
    // Get user from req
    const userId = req.userId;
    // Finding the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Current user not found",
      });
    }
    // If we got user
    return res.status(200).json(user);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Getting Current User Error  ${error}`,
    });
  }
};
