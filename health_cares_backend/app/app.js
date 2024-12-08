import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import {connectDB} from "./config/db";
import authRouter from "./routes/auth";
import doctorRouter from "./routes/doctor";
import serviceRouter from "./routes/service";
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
    res.json({ message: "HealthCareApp API." });
});
app.use("/api", authRouter);
app.use("/api", doctorRouter);
app.use("/api", serviceRouter);
connectDB(process.env.DB_URL);
export const HealthCareApp = app;