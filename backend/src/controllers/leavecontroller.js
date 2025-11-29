import Leave from "../models/leave.js";
import Student from "../models/student.js";

// Apply for leave
export const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;
    
    const student = await Student.findOne({ email: req.user.email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }
    
    const studentId = student._id;

    const leave = new Leave({
      studentId,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      reason,
    });

    await leave.save();

    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      data: leave,
    });
  } catch (error) {
    console.error("Error applying for leave:", error);
    res.status(500).json({
      success: false,
      message: "Error applying for leave",
    });
  }
};

// Get all leave requests (admin)
export const getAllLeaveRequests = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("studentId", "name rollNo roomNo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leave requests",
    });
  }
};

// Get leave requests by student
export const getLeavesByStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.user.email });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }
    
    const leaves = await Leave.find({ studentId: student._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leaves",
    });
  }
};

// Update leave status (admin)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("studentId", "name rollNo");

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave status updated",
      data: leave,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating leave status",
    });
  }
};
