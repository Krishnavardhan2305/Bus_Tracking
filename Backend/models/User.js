import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "admin", "superadmin"],
    default: "student",
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },

  assignedBus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);