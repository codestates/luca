const app = require('./index')
const { cards } = require('./models');
const { treeModel } = require("./controllers/convertTree");
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const mindmapController = require('./controllers/mindmap');
const cardController = require('./controllers/card');

// const countRoom = (roomName) => {
//     return io.sockets.adapter.rooms.get(roomName)?.size;
// }
io.on("connection", (socket) => {
    // 프로젝트 입장하면 해당 프로젝트로 소켓 연결, 다른 사람에게 입장 정보를 알려준다.
    socket.on("enterRoom", async (roomName, projectId) => {
        console.log(roomName)
        socket.join(roomName);
        socket.emit("enterRoom", socket.id)
        socket.to(roomName).emit('enterRoom', socket.id);
        const mindmapResult = await mindmapController.get(projectId);
        const cardResult = await cardController.get(projectId);
        // console.log(socket.nsp)
        // treeModel(result, 0);
        socket.emit("initData", mindmapResult, cardResult)
        socket.to(roomName).emit('initData', mindmapResult, cardResult);
        // console.log("SOCKETIO connect EVENT: ", socket.id, " client connect");
    })

    // 같은 프로젝트에 접속하고 있는 사람들끼리 데이터 공유가 가능하다.
    socket.on("Send_Server", (data, roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit("Send_Client", `${data} 서버에서 전송`)
        socket.emit("Send_Client", `${data} 서버에서 전송`)

        console.log(data);
    })

    socket.on("createCard", async (data, roomName) => {
        socket.join(roomName);
        const result = await cardController.create(data);
        socket.to(roomName).emit("Create_Card", result);
        socket.emit("Create_Card", result);

        console.log(typeof data.projectId);
    })

    socket.on("deleteCard", async (data, roomName) => {
        socket.join(roomName);
        const result = await cardController.create(data);
        socket.to(roomName).emit("Create_Card", result);
        socket.emit("Create_Card", result);

        console.log(typeof data.projectId);
    })

    // 프로젝트 퇴장 시 같은 프로젝트에 접속해있는 사람에게 퇴장 정보를 알려준다.
    socket.on("disconnect", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye"))

        console.log("SOCKETIO disconnect EVENT: ", socket.id, " client disconnect");
        console.log(socket.rooms);
    })
});

module.exports = server;