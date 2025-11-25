import express from "express";
import {
  register,
  login,
  logout,
  getAllStudents,
} from "../controllers/auth.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/students", protect, adminOnly, getAllStudents);
router.get("/me", protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
