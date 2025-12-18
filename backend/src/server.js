import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

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
const __dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use(cors(corsOptions));

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("(.*)", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve frontend build
// app.use(express.static(path.join(__dirname, "../frontend/dist"))); // or build

// // ⚠️ THIS IS THE FIX
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });
