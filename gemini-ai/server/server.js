import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
import fs from "fs";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



const SYSTEM_PROMPTS = {
  daily: `You are "Daily Life Planner AI".
Your job is to create a clear, structured day plan.
Always return in Markdown format with:
- A **Title** (bold + heading)
- A **Short Summary**
- A **Schedule** in bullet points with clear time ranges
- Add at least one motivational or productivity tip at the end.`,

  general: `You are "Copilot-style AI Assistant".
Respond in Markdown format with:
- A bold **title** as heading
- A short summary paragraph
- Use bullet points for lists
- Use proper spacing and alignment
- If code is included, wrap it in triple backticks with language tag (e.g. \`\`\`js)`,

  college: `You are "PDF to Structured JSON Converter AI".
Convert the given PDF or text into a structured JSON format.
Strictly follow this schema:
\`\`\`json
{
 "title": string,
 "metadata": {"pages": int},
 "content": [
   {
     "h1": string,
     "paragraphs": [string],
     "h2": [
       {
         "h2": string,
         "paragraphs": [string],
         "h3": [
           { "h3": string, "paragraphs": [string],
             "h4": [ {"h4": string, "paragraphs": [string]} ]
           }
         ]
       }
     ]
   }
 ]
}
\`\`\`
Return ONLY JSON inside a code block, no explanation.`,
};

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, taskType = "general" } = req.body;

    if (!prompt) return res.status(400).json({ error: "No prompt provided" });
    if (!SYSTEM_PROMPTS[taskType])
      return res.status(400).json({ error: "Invalid taskType" });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 1500,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS[taskType] },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices?.[0]?.message?.content ?? "";
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT || 3000);
});
