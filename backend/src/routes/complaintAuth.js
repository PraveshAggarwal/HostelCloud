import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintsByStudent,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintcontroller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createComplaint);
router.get("/", protect, adminOnly, getAllComplaints);
router.get("/my", protect, getComplaintsByStudent);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);
router.delete("/:id", protect, adminOnly, deleteComplaint);

export default router;
