import express from "express";
import {
  applyLeave,
  getAllLeaveRequests,
  getLeavesByStudent,
  updateLeaveStatus,
} from "../controllers/leavecontroller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, applyLeave);
router.get("/", protect, adminOnly, getAllLeaveRequests);
router.get("/my", protect, getLeavesByStudent);
router.put("/:id/status", protect, adminOnly, updateLeaveStatus);

export default router;
