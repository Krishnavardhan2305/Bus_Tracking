import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true, 
  },
}, { timestamps: true });

export default mongoose.model("College", collegeSchema);