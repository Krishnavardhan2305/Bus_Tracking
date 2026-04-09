import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
  },

  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },

  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  }

}, { timestamps: true });

export default mongoose.model("Bus", busSchema);