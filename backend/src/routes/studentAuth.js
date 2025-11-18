import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
import Student from "../models/student.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.get("/:rollNo", async (req, res) => {
  const student = await Student.findOne({ rollNo: req.params.rollNo });
  res.json(student);
});

router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;
