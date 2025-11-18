import jwt from "jsonwebtoken";
import student from "../models/student";
import dotenv from "dotenv";
dotenv.config();

export async function signup(req, res) {
  const { email, password, fullname } = req.body;
  try {
    if (!email || !password || !fullname) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // to check the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists, please use a different" });
    }

    const newUser = await User.create({
      fullname,
      email,
      password,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jwt", token, {
      httpOnly: true, // prevents XSS attacks
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // prevent CSRF attack
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, rollNo, role } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPass, rollNo, role });
  await user.save();

  res.json({ message: "User registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", {
    expiresIn: "1h",
  });
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
});

export const getAllStudents = async (req, res) => {
  try {
    const students = await student.find().select("-password");

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

export default router;
