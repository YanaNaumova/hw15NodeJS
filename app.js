import express from "express";
import { Server } from "socket.io";
import http from "http";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connection");
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
