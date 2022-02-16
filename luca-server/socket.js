const app = require('./index')
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: {origin: "*"}});
const project = io.of('/project1')

project.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("conSuccess", 'success');

  console.log(socket.nsp)

  socket.on("add", (data) =>{
    console.log(socket.nsp)
    console.log('==add==', socket.id);
    console.log(data);
    socket.emit("addReply", {'Tree': 'tree1'});
    socket.broadcast.emit("addReply", {'Tree': 'tree1'});
  });

  socket.on("delete", (data) =>{
    console.log(socket.nsp)
    console.log('==delete==');
    console.log(data);
    socket.emit("deleteReply", { 'Tree': 'tree2'});
    socket.broadcast.emit("deleteReply", {'Tree': 'tree2'});
  });
});

module.exports = server;