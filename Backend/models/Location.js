import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },

  lat: Number,
  lng: Number,

  timestamp: {
    type: Date,
    default: Date.now,
  }

}, { timestamps: true });

export default mongoose.model("Location", locationSchema);