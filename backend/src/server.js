import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/studentAuth.js";
import attendanceRoutes from "./routes/attendanceAuth.js";
import complaintRoutes from "./routes/complaintAuth.js";
import leaveRoutes from "./routes/leaveAuth.js";
import laundaryRoutes from "./routes/laundaryAuth.js";
import noticeRoutes from "./routes/noticeAuth.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/laundry", laundaryRoutes);
app.use("/api/notices", noticeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
