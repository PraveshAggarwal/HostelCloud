import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["present", "absent", "leave"],
    default: "present",
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
});
export default mongoose.model("attendance", attendanceSchema);
