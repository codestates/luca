const { cards } = require("../models");
const cardController = require("./card");
const mindmapController = require("./mindmap");

const socketCanvas = async (socket) => {
    // 전체 카드를 보내준다.
    socket.on("initData", async (roomName) => {
        
        const cardInfo = await cardController.get(roomName);
        const mindmapInfo = await mindmapController.get(roomName);

        socket.emit("initData", cardInfo, mindmapInfo)
        socket.broadcast.to(roomName).emit("initData", cardInfo, mindmapInfo);
    })

    // 카드를 추가한 후 전체 카드 데이터를 보내준다.
    socket.on("createCard", async (userId, content, roomName) => {
        socket.join(roomName);

        console.log(socket.nsp);
        console.log(socket.id);
        
        await cardController.create(userId, content, roomName);
        const cardInfo = await cardController.get(roomName);
        
        socket.emit("createCard", cardInfo)
        socket.broadcast.to(roomName).emit("createCard", cardInfo);
    })

    // 카드를 삭제한 후 전체 카드 데이터를 보내준다.
    socket.on("deleteCard", async (cardId, roomName) => {
        socket.join(roomName);

        await cardController.delete(cardId);
        const cardInfo = await cardController.get(roomName);

        socket.emit("deleteCard", cardInfo)
        socket.broadcast.to(roomName).emit("deleteCard", cardInfo);
    })

    socket.on("addMindmap", async (data, roomName) => {
        socket.join(roomName);

        await mindmapController.add(data);
        const cardInfo = await cardController.get(roomName);
        const mindmapInfo = await mindmapController.get(roomName);

        socket.emit("addMindmap", cardInfo, mindmapInfo);
        socket.broadcast.to(roomName).emit("addMindmap", cardInfo, mindmapInfo);
    })

    socket.on("editBlockStart", async (roomName) => {
        socket.join(roomName);

        socket.broadcast.to(roomName).emit("editBlockStart", {isBlock: true});
    })

    socket.on("editBlockEnd", async (roomName) => {
        socket.join(roomName);

        socket.broadcast.to(roomName).emit("editBlockEnd", {isBlock: false});
    })
}

module.exports = socketCanvas;