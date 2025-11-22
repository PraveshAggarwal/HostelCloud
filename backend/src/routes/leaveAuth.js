import express from "express";
import {
  bookLaundrySlot,
  getAllLaundryBookings,
  getLaundryByStudent,
  updateLaundryStatus,
  getAvailableSlots,
} from "../controllers/laundry.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, bookLaundrySlot);
router.get("/", protect, adminOnly, getAllLaundryBookings);
router.get("/my", protect, getLaundryByStudent);
router.get("/available/:date", protect, getAvailableSlots);
router.put("/:id/status", protect, adminOnly, updateLaundryStatus);

export default router;
