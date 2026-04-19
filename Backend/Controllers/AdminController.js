import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import Bus from "../models/Bus.js";
import College from "../models/College.js";
import Route from "../models/Route.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        collegeId: user.collegeId,
      },
      token,
    });
  } catch (error) {
    console.error("loginAdmin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAdminMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const admin = await User.findById(userId)
      .select("-password")
      .populate("collegeId", "name email code");

    return res.status(200).json({
      user: admin,
    });
  } catch (error) {
    console.error("getAdminMe error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addDriver = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const collegeId = req.user.collegeId;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const existingDriver = await Driver.findOne({
      phone,
      collegeId,
    });

    if (existingDriver) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      phone,
      password: hashedPassword,
      collegeId,
    });

    const driverData = driver.toObject();
    delete driverData.password;

    return res.status(201).json({
      message: "Driver added successfully",
      driver: driverData,
    });
  } catch (error) {
    console.error("addDriver error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;

    const drivers = await Driver.find({ collegeId })
      .select("-password")
      .populate("busId", "busNumber");

    return res.status(200).json({
      count: drivers.length,
      drivers,
    });
  } catch (error) {
    console.error("getAllDrivers error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addBus = async (req, res) => {
  try {
    const { busNumber, routeId } = req.body;
    const collegeId = req.user.collegeId;

    if (!busNumber) {
      return res.status(400).json({ message: "Bus number is required" });
    }

    const existingBus = await Bus.findOne({ busNumber, collegeId });
    if (existingBus) {
      return res.status(400).json({ message: "Bus already exists" });
    }

    if (routeId) {
      if (!mongoose.Types.ObjectId.isValid(routeId)) {
        return res.status(400).json({ message: "Invalid route ID" });
      }

      const route = await Route.findOne({ _id: routeId, collegeId });
      if (!route) {
        return res.status(404).json({ message: "Route not found in your college" });
      }
    }

    const bus = await Bus.create({
      busNumber,
      routeId: routeId || null,
      collegeId,
    });

    return res.status(201).json({
      message: "Bus added successfully",
      bus,
    });
  } catch (error) {
    console.error("addBus error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBuses = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;

    const buses = await Bus.find({ collegeId })
      .populate("driverId", "name phone")
      .populate("routeId", "name");

    return res.status(200).json({
      count: buses.length,
      buses,
    });
  } catch (error) {
    console.error("getAllBuses error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const assignDriverToBus = async (req, res) => {
  try {
    const { busId, driverId } = req.body;
    const collegeId = req.user.collegeId;

    // ✅ Validate input
    if (!busId || !driverId) {
      return res.status(400).json({
        message: "busId and driverId are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(busId) ||
      !mongoose.Types.ObjectId.isValid(driverId)
    ) {
      return res.status(400).json({
        message: "Invalid busId or driverId",
      });
    }

    // ✅ Get bus (same college)
    const bus = await Bus.findOne({ _id: busId, collegeId });
    if (!bus) {
      return res.status(404).json({
        message: "Bus not found in your college",
      });
    }

    const driver = await User.findOne({
      _id: driverId,
      role: "driver",
      collegeId,
    });

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found in your college",
      });
    }

    // ❗ Driver already assigned somewhere else
    if (
      driver.assignedBus &&
      driver.assignedBus.toString() !== busId
    ) {
      return res.status(400).json({
        message: "Driver already assigned to another bus",
      });
    }

    // ❗ Bus already has another driver
    if (
      bus.driverId &&
      bus.driverId.toString() !== driverId
    ) {
      return res.status(400).json({
        message: "Bus already has a driver assigned",
      });
    }

    // ✅ Assign
    bus.driverId = driverId;
    driver.assignedBus = busId;

    await bus.save();
    await driver.save();

    return res.status(200).json({
      message: "Driver assigned successfully 🚍",
    });

  } catch (error) {
    console.error("assignDriverToBus error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getAdminCollegeDetails = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    return res.status(200).json({
      college,
    });
  } catch (error) {
    console.error("getAdminCollegeDetails error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addRoute = async (req, res) => {
  try {
    const { name, stops } = req.body;

    if (!name || !stops || stops.length < 2) {
      return res.status(400).json({
        message: "Route name and at least 2 stops required",
      });
    }

    const route = await Route.create({
      name,
      stops,
      collegeId: req.user.collegeId,
    });

    res.status(201).json({
      message: "Route created successfully",
      route,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find({
      collegeId: req.user.collegeId,
    });

    res.json({ routes });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logoutAdmin = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("logoutAdmin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};