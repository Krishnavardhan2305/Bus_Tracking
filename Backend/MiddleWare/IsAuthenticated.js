import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    //  1. Check if token exists in cookies
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // 2. Else check if token is in Authorization header
    else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 3. If no token found anywhere → reject
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    //  4. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //  decoded = { userId, role }

    //  5. Fetch user from DB using userId
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //  6. Attach user to request
    req.user = user;

    //  7. Continue to next middleware/controller
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const superAdminOnly = (req, res, next) => 
{
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};