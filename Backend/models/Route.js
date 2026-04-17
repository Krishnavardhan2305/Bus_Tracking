import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  stops: [
    {
      name: String,
    }
  ],

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  }

}, { timestamps: true });

export default mongoose.model("Route", routeSchema);