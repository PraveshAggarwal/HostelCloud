import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6, // recommended
    },

    rollNo: {
      type: String,
      trim: true,
    },

    roomNo: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
