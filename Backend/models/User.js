const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    sparse: true, // important (drivers may not have email)
  },

  phone: {
    type: String,
    unique: true,
    sparse: true, // admin may not have phone
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