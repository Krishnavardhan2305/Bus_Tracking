import express from "express";

import { isAuthenticated, StudentOnly } from "../MiddleWare/IsAuthenticated.js";
import { getBusesForStudent, loginStudent } from "../Controllers/StudentController.js";
const router = express.Router();

router.post("/login", loginStudent);
router.get("/buses",isAuthenticated,StudentOnly,getBusesForStudent)

export default router;