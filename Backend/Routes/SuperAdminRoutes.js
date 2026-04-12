import express from "express";
import {
  loginSuperAdmin,
  createCollege,
  createCollegeAdmin,
  getAllColleges,
  getCollegeAdmins,
  getCollegeById,
  viewAdmins,
  logout,
  getMe
} from "../Controllers/SuperAdminController.js";

import { isAuthenticated , superAdminOnly } from "../MiddleWare/IsAuthenticated.js";

const router = express.Router();
router.get("/me", isAuthenticated, superAdminOnly, getMe);
router.post("/login", loginSuperAdmin);
router.post("/college", isAuthenticated, superAdminOnly, createCollege);
router.post("/admin", isAuthenticated, superAdminOnly, createCollegeAdmin);
router.get("/colleges", isAuthenticated, superAdminOnly, getAllColleges);
router.get("/admins/:collegeId", isAuthenticated, superAdminOnly, getCollegeAdmins);
router.get("/college/:id", isAuthenticated, superAdminOnly, getCollegeById);
router.get("/admins/:collegeId", isAuthenticated, superAdminOnly, viewAdmins);
router.get("/logout", isAuthenticated, superAdminOnly, logout);
export default router;