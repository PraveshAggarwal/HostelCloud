import express from "express";
import {
  createNotice,
  getAllNotices,
  getRecentNotices,
  updateNotice,
  deleteNotice,
} from "../controllers/notice.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createNotice);
router.get("/", protect, getAllNotices);
router.get("/recent", protect, getRecentNotices);
router.put("/:id", protect, adminOnly, updateNotice);
router.delete("/:id", protect, adminOnly, deleteNotice);

export default router;
