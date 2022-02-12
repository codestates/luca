const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const config = require('./config/config');
const { SERVER_PORT } = config;
const port = SERVER_PORT;

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

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
