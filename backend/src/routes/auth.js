import express from "express";
import {
  register,
  login,
  getAllStudents,
} from "../controllers/auth.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/students", protect, adminOnly, getAllStudents);

export default router;
