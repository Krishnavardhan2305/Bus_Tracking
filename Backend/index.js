import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import superadminRoutes from "./Routes/SuperAdminRoutes.js";
import adminRoutes from "./Routes/AdminRoutes.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use("/api/v1/superadmin", superadminRoutes);
app.use("/api/v1/admin", adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
});