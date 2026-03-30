import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import evaluateCandidateRoute from "./routes/evaluate.js";
import generateQuestionRoute from "./routes/generateQuestion.js";
import startCallRoute from "./routes/startCall.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",evaluateCandidateRoute);
app.use("/api",generateQuestionRoute);
app.use("/api", startCallRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
