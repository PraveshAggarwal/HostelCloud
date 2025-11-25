import express from "express";
import {
  bookLaundarySlot,
  getAllLaundaryBookings,
  getLaundaryByStudent,
  updateLaundaryStatus,
  getAvailableSlots,
} from "../controllers/laundarycontroller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, bookLaundarySlot);
router.get("/", protect, adminOnly, getAllLaundaryBookings);
router.get("/my", protect, getLaundaryByStudent);
router.get("/available/:date", protect, getAvailableSlots);
router.put("/:id/status", protect, adminOnly, updateLaundaryStatus);

export default router;
