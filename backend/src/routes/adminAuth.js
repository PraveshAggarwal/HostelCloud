import express from "express";
const router = express.Router();

import { protect, adminOnly } from "../middleware/auth.middleware.js";

import Student from "../models/student.js";
import Complaint from "../models/complaint.js";
import Attendance from "../models/attendance.js";
import Laundry from "../models/laundary.js";
import Notice from "../models/notice.js";
import Leave from "../models/leave.js";
import { getAllStudents } from "../controllers/auth.controller.js";

router.get("/dashboard", protect, adminOnly, async (req, res) => {
  try {
    const today = new Date().toDateString();

    const [
      totalStudents,
      pendingComplaints,
      todayAttendance,
      todayLaundry,
      totalNotices,
      pendingLeaves,
    ] = await Promise.all([
      Student.countDocuments(),
      Complaint.countDocuments({ status: "open" }),
      Attendance.find({ date: new Date().toDateString() }),
      Laundry.find({ date: new Date().toDateString() }),
      Notice.countDocuments(),
      Leave.countDocuments({ status: "pending" }),
    ]);

    // Calculate today's attendance
    const present = todayAttendance.filter(
      (a) => a.status === "present"
    ).length;
    const attendancePercent =
      totalStudents > 0 ? ((present / totalStudents) * 100).toFixed(1) : 0;

    res.json({
      totalStudents,
      attendanceToday: `${present}/${totalStudents} (${attendancePercent}%)`,
      pendingComplaints,
      laundryToday: todayLaundry.length,
      totalNotices,
      pendingLeaveRequests: pendingLeaves,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/admin/students", protect, adminOnly, getAllStudents);

export default router;
