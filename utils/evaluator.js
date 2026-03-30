import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.LLM_MODEL,
});

export async function evaluateCandidate({ name, role, answers }) {
    const safeName = typeof name === "string" && name.trim() ? name.trim() : "Candidate";
    const safeRole = typeof role === "string" && role.trim() ? role.trim() : "the role";
    const safeAnswers = Array.isArray(answers) ? answers : [];
    const prompt = `You are a senior technical interviewer evaluating a candidate.
    Role: ${safeRole}
    Candidate: ${safeName}
    Evaluate based on:
    1.Technical knowledge(0-4)
    2.Communication(0-3)
    3.Problem solving(0-3)

    Candidate answers:
    ${safeAnswers.map((answer, index) => `Question ${index + 1}: ${answer}`).join("\n")}
    
    Return STRICT JSON:
    {
        "score":number,
        "summary": "",
        "strengths": [],
        "weaknesses": [],
        "decision": ""
    }`;

    const response = await llm.invoke(prompt);
    const raw = response.content;
    const match = raw.match(/\{[\s\S]*\}/);

    if (!match) {
        return {
            score: 0,
            summary: "",
            strengths: [],
            weaknesses: [],
            decision: "No response from LLM"
        };
    }
    return JSON.parse(match[0]);
}
