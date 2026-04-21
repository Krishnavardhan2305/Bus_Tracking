import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    sparse: true, 
  },

  phone: {
    type: String,
    unique: true,
    sparse: true, 
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "admin", "superadmin", "driver"],
    required: true,
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