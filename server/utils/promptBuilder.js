// ================================================================================
//                                  Prompt Statements
// ================================================================================

export const buildPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart,
}) => {
  return `
    You are a STRICT JSON generator for an exam preparation system.

    VERY IMPORTANT:
    - Output MUST be valid JSON
    - Your response will be parsed using JSON.parse()
    - INVALID JSON will cause system failure
    - Use ONLY double quotes "
    - No comments, No trailing commas
    - Escape line breaks using \\n
    - Do NOT use emojis inside text values

    TASK:
    Convert the given tokpic into exam-focused notes.

    INPUT:
    Topic : ${topic}
    Class Level : ${classLevel || "Not specified"}
    Exam Type : ${examType || "General"}
    Revision Mode : ${revisionMode ? "ON" : "OFF"}
    Include Diagram : ${includeDiagram ? "YES" : "NO"}
    Include Charts : ${includeChart ? "YES" : "NO"}

    GLOBAL CONTENT RULES:
    - User clear, simple, exam-oriented language
    - Notes MUST be Markdown formatted
    - Heading and bullet points only

    REVISION MODE RULES (CRITICAL):
    - If REVISION MODE is ON:
        - Notes must be VERY SHORT
        - Only bullet points
        - One-line answers only
        - Definations, formulas, keywords
        - No paragraphs
        - No explanations
        - Content must feel like:
            - last-day revision
            - 5-minute exam cheat sheet
        - revisionPoints MUST summarize ALL important facts

    - if REVISION MODE is OFF:
        - Notes must be DETAILED but exam-focused
        - Each topic should include:
            - definition
            - short explanaiton
            - examples (if applicable)
        - Paragraph length : max 2-4 lines
        - No storytelling, no extra theory

    IMPORTANCE RULES:
    - Devide sub-topics into THREE categories:
        - ⭐ Very Important Topics
        - ⭐⭐ Important Topics
        - ⭐⭐⭐ Frequently Asked Topics
    - All three categories MUST be present
    - Base importance on exam frequency and weightage

    DIAGRAM RULES:
    - If INCLUDE DIAGRAM is YES:
        - diagram.data MUST be SINGLE STRING
        - Valid Mermaid syntax only
        - Must start with: graph TD
        - Wrap EVERY node label in squre brackets []
        - Do NOT use special characters inside labels
    - If INCLUDE DIAGRAM is NO:
        - diagram.data must be ""

    CHART RULES (RECHARTS):
    - If INCLUDE CHARTS is YES:
        - charts array MUST NOT be empty
        - Generate at least ONE chart
        - Choose chart based on topic type:
            - THEORY topic -> bar or pie (importance / weightage)
            - PROCESS topic -> bar or line (steps / stages)
        - Use numeric values ONLY
        - Labels must be short and exam-oriented
    - If INCLUDE CHARTS is NO:
    - charts MUST be []

    CHART TYPES ALLOWED:
    - bar
    - line
    - pie

    CHART OBJECT FORMAT:
    {
        "type" : "bar | line | pie",
        "title" : "string",
        "data" : [
            {"name" : "string" , "value" : 10}
        ]
    }

    STRICT JSON FORMAT (DO NOT CHANGE):
    {
        "subTopics" : {
           "⭐" : [],
           "⭐⭐" : [],
           "⭐⭐⭐" : [], 
        },
        "importance" : "⭐ | ⭐⭐ | ⭐⭐⭐",
        "notes" : "string",
        "revisionPoints" : [],
        "questions" : {
            "short" : [],
            "long" : [],
            "diagram" : ""
        },
        "diagram" : {
            "type" : "flowchart | graph | process",
            "data" : ""
        },
        "charts" : []
    }

    RETURN ONLY VALID JSON.
    `;
};
