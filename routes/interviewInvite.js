import express from "express";
import { sendInterviewInvite } from "../utils/mailer.js";

const router = express.Router();

router.post("/send-interview-invite", async (req, res) => {
    const { candidateName, candidateEmail, role } = req.body;

    if (!candidateName || !candidateEmail || !role) {
        return res.status(400).json({
            error: "candidateName, candidateEmail, and role are required.",
        });
    }

    try {
        const result = await sendInterviewInvite({
            candidateName,
            candidateEmail,
            role,
        });

        return res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to send interview invite.",
        });
    }
});

export default router;
