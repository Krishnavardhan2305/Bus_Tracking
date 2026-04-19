import { io } from "./index.js";

export const initSocket = () => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Driver sends location
    socket.on("send-location", (data) => {
      // data = { busId, lat, lng }

      console.log("Location received:", data);

      // broadcast to all clients
      io.emit("receive-location", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};