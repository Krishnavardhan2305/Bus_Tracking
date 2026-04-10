import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const seed = async () => {
  try {
    await mongoose.connect("MONGO_DB_URL");

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("your_pwd", salt);

    // create superadmin
    await User.create({
      name: "Super Admin",
      email: "",
      password: hashedPassword,
      role: "superadmin"
    });

    console.log("Super Admin Inserted!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();