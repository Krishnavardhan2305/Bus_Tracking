import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: String,

  phone: String,

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