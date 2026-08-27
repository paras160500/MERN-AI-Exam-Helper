import { Notes } from "../models/notes.model.js";

export const getMyNotes = async (req, res) => {
  try {
    // Getting the user's notes
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt",
      )
      .sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Get Current User Notes Error :- ${error}`,
    });
  }
};

export const getSingleNote = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });
    if (!notes) {
      return res.status(404).json({
        error: "Note not found",
      });
    }
    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Get Single Note Error :- ${error}`,
    });
  }
};
