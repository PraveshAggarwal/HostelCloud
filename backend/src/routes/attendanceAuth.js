import express from "express";
import {
  markAttendance,
  getAttendanceByStudent,
  getAllAttendance,
  updateCheckout,
  getMyAttendance,
} from "../controllers/attendance.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, markAttendance);
router.get("/", protect, adminOnly, getAllAttendance);
router.get("/my", protect, getMyAttendance);
router.get("/student/:studentId", protect, getAttendanceByStudent);
router.put("/:id/checkout", protect, updateCheckout);

export default router;
