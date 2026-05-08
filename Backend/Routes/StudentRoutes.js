import express from "express";

import { isAuthenticated, StudentOnly } from "../MiddleWare/IsAuthenticated.js";
import { getBusesForStudent, loginStudent, logoutStudent } from "../Controllers/StudentController.js";
const router = express.Router();

router.post("/login", loginStudent);
router.get("/buses",isAuthenticated,StudentOnly,getBusesForStudent);
router.get("/logout", logoutStudent);

export default router;