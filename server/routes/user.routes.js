// ================================================================================
//                             Import and Init Statements
// ================================================================================

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controller.js";
const userRouter = express.Router();

// ================================================================================
//                                  Route Statements
// ================================================================================

userRouter.get("/currentuser", isAuth, getCurrentUser);

export default userRouter;
