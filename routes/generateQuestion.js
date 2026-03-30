import express from "express";
import fs from "fs";
import { generateQuestion } from "../utils/questionGenerator.js";

const router = express.Router();

router.post("/generate-question",async(req,res)=>{
    const {role,prevAns} = req.body;
    const question = await generateQuestion(role,prevAns);
    res.json({question});
});

export default router;