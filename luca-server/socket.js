const app = require("./index");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const socketCanvas = require("./controllers/canvas");

try {
  io.on("connection", (socket) => {
    socket.on("enterRoom", (roomName) => {
      socket.join(roomName);
      socket.emit("enterRoom", socket.id);
      socket.to(roomName).emit("enterRoom", socket.id);
      console.log("SOCKETIO connect EVENT: ", socket.id, " client connect");
    });

    socket.on("disconnect", () => {
      socket.rooms.forEach((room) => socket.to(room).emit("bye"));
      console.log("SOCKETIO disconnect EVENT: ", socket.id, " client disconnect");
    });

    socketCanvas(socket);
  });
} catch (err) {
  console.log(err);
}

module.exports = server;