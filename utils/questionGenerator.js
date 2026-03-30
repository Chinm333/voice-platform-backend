import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.LLM_MODEL,
});

export async function generateQuestion(role, prevAns = []) {
    const safeRole = typeof role === "string" && role.trim() ? role.trim() : "the role";
    const safeAnswers = Array.isArray(prevAns) ? prevAns : [];
    const prompt = `
    You are a technical interviewer.
    Role: ${safeRole}
    Answers: ${safeAnswers.join("\n")}
    Ask next best question.
    - Strong -> deeper
    - Weak -> simpler
    Return only the question.
    `;
    const response = await llm.invoke(prompt);
    return response.content.trim();
}
