import mongoose from "mongoose";

const laundrySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    slot: {
      type: String,
      enum: ["morning", "evening"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["booked", "collected"],
      default: "booked",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Laundary", laundrySchema);
