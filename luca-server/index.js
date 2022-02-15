
require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.SERVER_PORT;

// Routes 
const indexRouter = require('./routes');

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// router
app.use('/', indexRouter);

// test용
app.get('/', (req, res) => {
  res.send('Hi');
});





const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: {origin: "*"}});



//const aIo = io.of(/^\/porject\/\w{4,20}$/);
io.on("connection", (socket) => {
  console.log('con')


  socket.on("changeProject", (req) => {
    io.join()
    console.log(req)
  })
  
});
// socket.join('a');
// socket.on('send', (req) => {
//   console.log(req)
//   socket.emit('reply', '{Tree}')
//   socket.to('a').emit('reply', '{Tree}')
// })

io.on("changeProject", (socket) => {
  socket.on("changeProject", (req) => {
    console.log(req)
  })
})




server.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});