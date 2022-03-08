const cardController = require("./card");
const mindmapController = require("./mindmap");

const socketCanvas = async (socket) => {
    socket.on("initData", async (roomName) => {
        const cardInfo = await cardController.get(roomName);
        const mindmapInfo = await mindmapController.get(roomName);
        socket.emit("initData", cardInfo, mindmapInfo)
        socket.broadcast.to(roomName).emit("initData", cardInfo, mindmapInfo);
    })

    socket.on("createCard", async (userId, content, color, roomName) => {
        socket.join(roomName);
        await cardController.create(userId, content, color, roomName);
        const cardInfo = await cardController.get(roomName);
        socket.emit("createCard", cardInfo)
        socket.broadcast.to(roomName).emit("createCard", cardInfo);
    })

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

    socket.on("deleteMindmap", async (data, roomName) => {
        socket.join(roomName);
        await mindmapController.delete(data, roomName);
        const cardInfo = await cardController.get(roomName);
        const mindmapInfo = await mindmapController.get(roomName);
        socket.emit("deleteMindmap", cardInfo, mindmapInfo);
        socket.broadcast.to(roomName).emit("deleteMindmap", cardInfo, mindmapInfo);
    })

    socket.on("editBlockStart", async (data, roomName) => {
        socket.join(roomName);
        socket.emit("editBlockStart", data);
        socket.broadcast.to(roomName).emit("editBlockStart", data);
    })

    socket.on("editBlockEnd", async (data, roomName) => {
        socket.join(roomName);
        socket.emit("editBlockEnd", data);
        socket.broadcast.to(roomName).emit("editBlockEnd", data);
    })

    socket.on("clickTimer", async (data, roomName) => {
        socket.join(roomName);
        socket.emit("clickTimer", data);
        socket.broadcast.to(roomName).emit("clickTimer", data);
    })

    socket.on("increaseTime", async (data, roomName) => {
        socket.join(roomName);
        socket.emit("increaseTime", data);
        socket.broadcast.to(roomName).emit("increaseTime", data);
    })

    socket.on("decreaseTime", async (data, roomName) => {
        socket.join(roomName);
        socket.emit("decreaseTime", data);
        socket.broadcast.to(roomName).emit("decreaseTime", data);
    })

    socket.on("startTimer", async (data, roomName) => {
        socket.join(roomName);
        socket.emit("startTimer", data);
        socket.broadcast.to(roomName).emit("startTimer", data);
    })

    socket.on("pauseTimer", async (data, roomName) => {
        socket.join(roomName);
        socket.emit("pauseTimer", data);
        socket.broadcast.to(roomName).emit("pauseTimer", data);
    })

    socket.on("resetTimer", async (data, roomName) => {
        socket.join(roomName);
        socket.emit("resetTimer", data);
        socket.broadcast.to(roomName).emit("resetTimer", data);
    })
}

module.exports = socketCanvas;