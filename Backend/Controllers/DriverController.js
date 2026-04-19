import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginDriver = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password required",
      });
    }

    const driver = await User.findOne({
      phone,
      role: "driver",
    });

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    const isMatch = await bcrypt.compare(password, driver.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: driver._id,
        role: driver.role,
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
        _id: driver._id,
        name: driver.name,
        role: driver.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getDriverDashboard = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "driver") {
      return res.status(403).json({ message: "Access denied" });
    }

    const bus = await Bus.findById(user.assignedBus)
      .populate("routeId");

    res.json({ bus });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};