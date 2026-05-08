import express from "express";
import {
  loginDriver,
  getDriverDashboard,
  logoutDriver
} from "../Controllers/DriverController.js";

import {
  isAuthenticated,
  driverOnly
} from "../MiddleWare/IsAuthenticated.js";

const router = express.Router();

router.post("/login", loginDriver);

router.get(
  "/dashboard",
  isAuthenticated,
  driverOnly,
  getDriverDashboard
);
router.get("/logout", logoutDriver);

export default router;