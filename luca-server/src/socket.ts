import * as http from "http";
import { Server, Socket } from "socket.io";
import { socketCanvas } from "./controllers/canvas";
import app from "./index";

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" }});

try {
    io.on("connection", (socket: Socket) => {
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

export default server;