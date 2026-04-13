import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true, 
  },

  password: {
    type: String,
    required: true,
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },

  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  }

}, { timestamps: true });

export default mongoose.model("Driver", driverSchema);