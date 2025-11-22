import Attendance from "../models/attendance.js";
import Student from "../models/student.js";
import User from "../models/User.js";

// Mark attendance
export const markAttendance = async (req, res) => {
  try {
    const { studentId, status, date, checkIn, checkOut } = req.body;

    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0); // resets the time → so only the date is compared.

    // Check if attendance already marked for this date
    const existingAttendance = await Attendance.findOne({
      studentId,
      date: {
        $gte: targetDate,
        $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.status = status;
      if (checkIn) existingAttendance.checkIn = new Date(checkIn);
      if (checkOut) existingAttendance.checkOut = new Date(checkOut);
      await existingAttendance.save();

      const populatedAttendance = await Attendance.findById(
        existingAttendance._id
      ).populate("studentId", "name rollNo roomNo");

      return res.status(200).json({
        success: true,
        message: "Attendance updated successfully",
        data: populatedAttendance,
      });
    }

    const attendance = new Attendance({
      studentId,
      status,
      date: targetDate,
      checkIn: checkIn
        ? new Date(checkIn)
        : status === "present"
        ? new Date()
        : null,
      checkOut: checkOut ? new Date(checkOut) : null,
    });

    await attendance.save();

    const populatedAttendance = await Attendance.findById(
      attendance._id
    ).populate("studentId", "name rollNo roomNo");

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: populatedAttendance,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error marking attendance",
    });
  }
};

// Get attendance by student
export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ studentId })
      .populate("studentId", "name rollNo")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
    });
  }
};

// Get attendance by user (for students to see their own)
export const getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find student record by user email to get the correct student ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const student = await Student.findOne({ email: user.email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student record not found",
      });
    }

    const attendance = await Attendance.find({ studentId: student._id }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
    });
  }
};

// Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("studentId", "name rollNo roomNo")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
    });
  }
};

// Update checkout time
export const updateCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByIdAndUpdate(
      id,
      { checkOut: new Date() },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Checkout time updated",
      data: attendance,
    });
  } catch (error) {
    console.error("Error updating checkout:", error);
    res.status(500).json({
      success: false,
      message: "Error updating checkout",
    });
  }
};
