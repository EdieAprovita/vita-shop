import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors((req, callback) => {
		const corsOptions = {
			credentials: true,
			origin: process.env.FRONTEND_URL,
		};
		callback(null, corsOptions);
	})
);

app.get("/api/v1", (req, res) => {
	res.send("API is running");
});

export default app;
