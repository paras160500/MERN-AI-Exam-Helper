// ================================================================================
//                                 Controller Statements
// ================================================================================

import { Notes } from "../models/notes.model.js";
import { UserModel } from "../models/user.model.js";
import { generateOpenAIResponse } from "../services/openai.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  try {
    // Getting the data from body
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;
    // If topic is not given
    if (!topic) {
      return res.status(401).json({
        message: "Please provide topic",
      });
    }
    // Find the user with userid
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found!",
      });
    }
    // If user dont have enough credits
    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();
      return res.status(403).json({
        message: "Insufficient Credits",
      });
    }
    // Generating Prompt
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });
    // Getting AI response
    const aiResponse = await generateOpenAIResponse(prompt);
    // update notes
    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });
    // update user -  reduce 10 credit & Add note to note array of user
    user.credits -= 10;
    if (user.credits <= 0) user.isCreditAvailable = false;
    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }
    user.notes.push(notes._id);
    await user.save();
    res.status(200).json({
      data: aiResponse,
      noteId: notes._id,
      creditsLeft: user.credits,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: `Generate Notes Error:-   ${error}`,
    });
  }
};
