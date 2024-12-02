import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import {connectDB} from "./config/db";
import authRouter from "./routes/auth";
import doctorRouter from "./routes/doctor";
var corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
app.use("/api", authRouter);
app.use("/api", doctorRouter);
connectDB(process.env.DB_URL);
export const HealthCareApp = app;