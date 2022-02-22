const app = require('./index')
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const { cards, projects, users_projects } = require("./models");

// const countRoom = (roomName) => {
//     return io.sockets.adapter.rooms.get(roomName)?.size;
// }
io.on("connection", (socket) => {
    // 프로젝트 입장하면 해당 프로젝트로 소켓 연결, 다른 사람에게 입장 정보를 알려준다.
    socket.on("Enter_Room", (roomName) => {
        socket.join(roomName);
        socket.emit("Enter_Room", socket.id)
        socket.to(roomName).emit('Enter_Room', socket.id);

        console.log(socket.rooms);
        console.log("SOCKETIO connect EVENT: ", socket.id, " client connect");
    })

    // 같은 프로젝트에 접속하고 있는 사람들끼리 데이터 공유가 가능하다.
    socket.on("Send_Server", (data, roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit("Send_Client", `${data} 서버에서 전송`)
        socket.emit("Send_Client", `${data} 서버에서 전송`)

        console.log(data);
    })

    // 프로젝트 퇴장 시 같은 프로젝트에 접속해있는 사람에게 퇴장 정보를 알려준다.
    socket.on("disconnect", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye"))

        console.log("SOCKETIO disconnect EVENT: ", socket.id, " client disconnect");
        console.log(socket.rooms);
    })

    // 전체 카드를 보내준다.
    socket.on("getCard", async (roomName) => {
        console.log(roomName)
        const cardInfo = await cards.findAll({ where: { projectId: roomName } });
        socket.emit("getCard", cardInfo)
        socket.broadcast.to(roomName).emit("getCard", cardInfo);
    })

    // 카드를 추가한 후 전체 카드 데이터를 보내준다.
    socket.on("addCard", async (userId, content, roomName) => {
        console.log(content)
        await cards.create(
            {
                userId: userId,
                projectId: roomName,
                content: content,
                storage: "card",
            });
        const cardInfo = await cards.findAll({ where: { projectId: roomName } });
        socket.emit("addCard", cardInfo)
        socket.broadcast.to(roomName).emit("addCard", cardInfo);
    })

    // 카드를 삭제한 후 전체 카드 데이터를 보내준다.
    socket.on("deleteCard", async (cardId, roomName) => {
        await cards.destroy({ where: { id: cardId } });
        const cardInfo = await cards.findAll({ where: { projectId: roomName } });
        socket.emit("deleteCard", cardInfo)
        socket.broadcast.to(roomName).emit("deleteCard", cardInfo);
    })
});
//createCard, addMindmap, deleteMindmap, initData, editBlock, enterRoom, editBlockStart, editBlockEnd
module.exports = server;