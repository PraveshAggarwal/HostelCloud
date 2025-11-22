import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Student from "../models/student.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Register new user
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNo,
      role,
      phone,
      roomNo,
      batch,
      parentName,
      parentContact,
      motherName,
      motherContact,
    } = req.body;

    if (!rollNo || !name || !email || !phone || !roomNo) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "student";

    const user = new User({
      name,
      email,
      password: hashedPassword,
      rollNo: userRole === "admin" ? null : rollNo,
      roomNo: userRole === "admin" ? null : roomNo,
      role: userRole,
    });

    await user.save();

    // Create student record only if role is student
    if (userRole === "student") {
      const student = new Student({
        rollNo,
        name,
        email,
        phone,
        roomNo,
        batch,
        parentName,
        parentContact,
        motherName,
        motherContact,
      });
      await student.save();
    }

    res.status(201).json({
      message: `${
        userRole === "admin" ? "Admin" : "Student"
      } registered successfully`,
    });
  } catch (error) {
    console.log("Error in register controller:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const identifier = (email || "").toString().trim();

    if (!identifier || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Support login by email (case-insensitive) or by roll number
    let user;
    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier.toLowerCase() });
    } else {
      user = await User.findOne({ rollNo: identifier });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
      },
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all students (admin only)
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching students",
    });
  }
};
