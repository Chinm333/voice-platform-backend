import express from "express";
import { startBolnaCall } from "../utils/bolna.js";

const router = express.Router();

router.post("/start-call", async (req, res) => {
    const { name, role, phone } = req.body;

    if (!name || !role || !phone) {
        return res.status(400).json({
            error: "name, role, and phone are required.",
        });
    }

    try {
        const data = await startBolnaCall({ name, role, phone });

        return res.json({
            success: true,
            data,
        });
    } catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Call failed.",
        });
    }
});

export default router;
