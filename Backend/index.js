import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import superadminRoutes from "./Routes/SuperAdminRoutes.js";
import adminRoutes from "./Routes/AdminRoutes.js";
import { Server } from "socket.io";
import { initSocket } from "./Socket.js"
import driverRoutes from "./Routes/DriverRoutes.js";

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
app.use("/api/v1/driver", driverRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
});

// ✅ Then attach socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// ✅ Socket logic
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("send-location", (data) => {
    console.log("Location received:", data);
    
    // broadcast to all
    io.emit("receive-location", data);
  });
  
  initSocket();
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

export { io };