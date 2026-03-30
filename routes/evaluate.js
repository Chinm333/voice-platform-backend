import express from "express";
import fs from "fs";
import { evaluateCandidate } from "../utils/evaluator.js";

const router = express.Router();
const FILE = "./data.json";

if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]");

router.post("/evaluate", async (req, res) => {
    const { name, role, answers } = req.body;
    const result = await evaluateCandidate({ name, role, answers });
    const candidate = {
        id: Date.now(),
        name,
        role,
        answers,
        ...result
    };
    const data = JSON.parse(fs.readFileSync(FILE));
    data.push(candidate);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.json(candidate);
});

router.get("/candidates", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    const { id, page = 1, limit = 10 } = req.query;
    let result = data;
    if (id) {
        result = data.filter((c) => c.id == req.query.id);
    }
    const pageNo = Number(page);
    const limitNo = Number(limit);
    const start = (pageNo - 1) * limitNo;
    const candidates = result.slice(start, start + limitNo);
    res.json({
        total: data.length,
        page: pageNo,
        limit: limitNo,
        data: candidates
    });
});

export default router;