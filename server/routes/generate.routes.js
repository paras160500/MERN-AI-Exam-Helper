// ================================================================================
//                             Import and Init Statements
// ================================================================================

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { generateNotes } from "../controllers/generate.controller.js";

const notesRouter = express.Router();

// ================================================================================
//                                  Route Statements
// ================================================================================

notesRouter.post("/generate-notes", isAuth, generateNotes);

export default notesRouter;
