# AI Voice Interview Platform

This project is an end-to-end AI-powered hiring system that automates first-round candidate screening using voice agents. 
Recruiters can trigger outbound calls to candidates, where an AI interviewer conducts a structured conversation, dynamically generates follow-up questions, 
and evaluates responses in real time. The system integrates a voice agent platform with a custom backend (for question generation and evaluation using LLMs) and 
a frontend dashboard to visualize candidate performance, including scores, summaries, strengths, and weaknesses. 
This reduces manual effort, ensures consistent evaluation, and accelerates hiring workflows.

The backend is built with Node.js and Express, serving as the system's core logic layer. 
It exposes APIs for generating adaptive interview questions and evaluating candidate responses using an LLM (via Groq). 
It also integrates with the voice agent platform through webhooks, enabling real-time interaction during calls, and supports outbound call triggering via API. 
Candidate data and evaluation results are temporarily stored in a JSON file for rapid prototyping, with the architecture designed to be easily extendable to a 
production database.
