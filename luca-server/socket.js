const app = require('./index')
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: {origin: "*"}});
const project1 = io.of('/project1')

project1.on("connection", (socket) => {
  socket.emit("conSuccess", 'success');
  socket.on("roomEnter", (data) => {
    socket.join(data)
  });

  socket.on("add", (data, roomName) =>{
    console.log(socket.sids);
    console.log('==room==', socket.rooms)
    console.log('==add==', socket.id);

    socket.emit("addReply", {'Tree': 'tree1'});
    socket.broadcast.to(roomName).emit("addReply", {'Tree': 'tree1'});
  });

  socket.on("delete", (data, roomName) =>{
    console.log(socket);
    console.log('==room==', socket.rooms)
    console.log('==delete==', socket.id);

    socket.emit("deleteReply", { 'Tree': 'tree2'});
    socket.broadcast.to(roomName).emit("deleteReply", {'Tree': 'tree2'});
  });

  socket.on('disconnect', (data) => {
    // console.log(data)
    console.log(socket)
    console.log("SOCKETIO disconnect EVENT: ", socket.id, " client disconnect");
    console.log(socket.rooms);
    socket.broadcast.emit("disconmsg", `${socket.id} out`)
  })
});

module.exports = server;