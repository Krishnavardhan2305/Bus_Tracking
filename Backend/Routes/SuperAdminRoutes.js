import express from "express";
import {
  loginSuperAdmin,
  createCollege,
  createCollegeAdmin,
  getAllColleges,
  getCollegeAdmins
} from "../Controllers/SuperAdminController.js";

import { isAuthenticated , superAdminOnly } from "../MiddleWare/IsAuthenticated.js";

const router = express.Router();

router.post("/login", loginSuperAdmin);
router.post("/college", isAuthenticated, superAdminOnly, createCollege);
router.post("/admin", isAuthenticated, superAdminOnly, createCollegeAdmin);
router.get("/colleges", isAuthenticated, superAdminOnly, getAllColleges);
router.get("/admins/:collegeId", isAuthenticated, superAdminOnly, getCollegeAdmins);

export default router;