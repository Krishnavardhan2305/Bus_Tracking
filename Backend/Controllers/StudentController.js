import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginStudent = async (req, res) => {
  try {
    const email = req.body.email?.trim().toUpperCase();
    const password = req.body.password;

    // console.log("Login attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const student = await User.findOne({
      role: "student",
      $expr: {
        $eq: [
          { $toUpper: { $trim: { input: "$email" } } },
          email
        ]
      }
    });

    if (!student) {
      console.log(" Student not found in DB");
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // console.log(" Found student:", student.email);

    const isMatch = await bcrypt.compare(
      String(password),
      student.password
    );

    if (!isMatch) {
      console.log(" Password mismatch");
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
  {
    userId: student._id,
    role: student.role,
    collegeId: student.collegeId, 
  },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "1d" }
);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: student._id,
        name: student.name,
        email: student.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBusesForStudent = async (req, res) => {
  try {
    const buses = await Bus.find({
      collegeId: req.user.collegeId,
    });

    res.json({ buses });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};