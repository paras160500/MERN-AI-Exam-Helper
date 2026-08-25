// ================================================================================
//                             Import & Init Statements
// ================================================================================

import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API;
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// ================================================================================
//                            Model Inference Statements
// ================================================================================

export const generateOpenAIResponse = async (prompt) => {
  try {
    // Get response
    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });
    // Get the text from response
    const text = response.output_text;
    if (!text) {
      throw new Error("OpenAI returned an empty response");
    }
    // Parsing the response
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response as JSON:");
      console.error(text);
      throw parseError;
    }
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
};
