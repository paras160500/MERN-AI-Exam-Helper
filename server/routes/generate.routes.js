// ================================================================================
//                             Import and Init Statements
// ================================================================================

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { generateNotes } from "../controllers/generate.controller.js";
import { getMyNotes, getSingleNote } from "../controllers/notes.controller.js";

const notesRouter = express.Router();

// ================================================================================
//                                  Route Statements
// ================================================================================

notesRouter.post("/generate-notes", isAuth, generateNotes);
notesRouter.get("/getnotes", isAuth, getMyNotes);
notesRouter.get("/:id", isAuth, getSingleNote);

export default notesRouter;
