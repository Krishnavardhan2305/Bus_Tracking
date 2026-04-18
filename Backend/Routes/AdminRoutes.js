import express from "express";
import {
  loginAdmin,
  getAdminMe,
  addDriver,
  getAllDrivers,
  addBus,
  getAllBuses,
  assignDriverToBus,
  getAdminCollegeDetails,
  logoutAdmin,
  addRoute,
  getRoutes,
} from "../Controllers/AdminController.js";

import { isAuthenticated, adminOnly } from "../MiddleWare/IsAuthenticated.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/me", isAuthenticated, adminOnly, getAdminMe);
router.get("/college", isAuthenticated, adminOnly, getAdminCollegeDetails);

router.post("/driver", isAuthenticated, adminOnly, addDriver);
router.get("/drivers", isAuthenticated, adminOnly, getAllDrivers);

router.post("/bus", isAuthenticated, adminOnly, addBus);
router.get("/buses", isAuthenticated, adminOnly, getAllBuses);

router.post("/route", isAuthenticated, adminOnly, addRoute);
router.get("/routes", isAuthenticated, adminOnly, getRoutes);
router.put("/assign-driver", isAuthenticated, adminOnly, assignDriverToBus);
router.get("/logout", isAuthenticated, adminOnly, logoutAdmin);

export default router;