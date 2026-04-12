import College from "../models/College.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });

    if (!user || user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", 
      secure: false,  
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json
    ({
      message: "Login successful",
      user: 
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const createCollege = async (req, res) => {
  try {
    const { name, email, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "Name and code required" });
    }

    // check duplicate
    const existing = await College.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "College already exists" });
    }

    const college = await College.create({
      name,
      email,
      code,
    });

    return res.status(201).json({
      message: "College created successfully",
      college,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};



export const createCollegeAdmin = async (req, res) => {
  try {
    const { name, email, password, collegeId } = req.body;

    if (!name || !email || !password || !collegeId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      collegeId,
    });

    // remove password before sending
    const { password: _, ...adminData } = admin.toObject();

    return res.status(201).json({
      message: "College admin created successfully",
      admin: adminData,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};



export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: colleges.length,
      colleges,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const getCollegeAdmins = async (req, res) => {
  try {
    const { collegeId } = req.params;

    const admins = await User.find({
      collegeId,
      role: "admin",
    }).select("-password");

    return res.status(200).json({
      count: admins.length,
      admins,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;

    const college = await College.findById(id);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({ college });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewAdmins = async (req, res) => {
  try {
    const { collegeId } = req.params;

    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const admins = await User.find({
      collegeId,
      role: "admin",
    }).select("-password");

    res.status(200).json({
      college,
      admins,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: " Logged out succesfully"
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}