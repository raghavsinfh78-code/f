// index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("a user connected");

  // store username
  socket.on("set username", (username) => {
    socket.username = username;
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", { user: socket.username, text: msg, id: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
