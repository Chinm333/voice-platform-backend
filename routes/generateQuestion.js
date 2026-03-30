import express from "express";
import fs from "fs";
import { generateQuestion } from "../utils/questionGenerator.js";

const router = express.Router();

router.post("/generate-question",async(req,res)=>{
    const { role, prevAns, previousAnswers } = req.body || {};
    const answers = Array.isArray(prevAns)
        ? prevAns
        : Array.isArray(previousAnswers)
            ? previousAnswers
            : typeof prevAns === "string"
                ? [prevAns]
                : typeof previousAnswers === "string"
                    ? [previousAnswers]
                    : [];
    const question = await generateQuestion(role, answers);
    res.json({question});
});

export default router;
