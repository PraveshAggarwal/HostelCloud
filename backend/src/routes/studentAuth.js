import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentByRollNo,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createStudent);
router.get("/", protect, getAllStudents);
router.get("/:rollNo", protect, getStudentByRollNo);
router.put("/:id", protect, adminOnly, updateStudent);
router.delete("/:id", protect, adminOnly, deleteStudent);

export default router;
