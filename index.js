const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendfile("/public/index.html");
});

server.listen(8000, () => console.log(`Server started at 8000`));
