import express from "express";
import http from "node:http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const ROOM_ID = "main_room";

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (username) => {
    socket.join(ROOM_ID);
    console.log(`User ${username} joined room: ${ROOM_ID}`);

    socket.to(ROOM_ID).emit("user_joined", username);
  });

  socket.on("send_message", (messageData) => {
    io.to(ROOM_ID).emit("receive_message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
httpServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});
