import express from "express";
import {
  loginDriver,
  getDriverDashboard
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

export default router;