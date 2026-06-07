import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import "dotenv/config";

const app = express();

// 1. ALLOWED FRONTEND ORIGINS WITH CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://fyp-6nnp.vercel.app",
      "https://fyp-coral-pi.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "token",
      "adminToken",
      "patientToken"
    ],
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// 2. NEW: GLOBAL DATABASE MIDDLEWARE FOR VERCEL
// This ensures MongoDB finishes connecting before any route query tries to run
app.use(async (req, res, next) => {
  try {
    await dbConnection();
    next();
  } catch (error) {
    console.error("Database connection middleware error:", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed. Please try again later.",
    });
  }
});

// 3. API ROUTES (Now protected by the database connection check above)
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.get("/", (req, res) => {
  res.status(200).send("API Working");
});

// 4. ERROR MIDDLEWARE (Should always be last)
app.use(errorMiddleware);

export default app;
