//require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 80;

// Routes
// const indexRouter = require('./routes');

// Middle-ware
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    method: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  }),
);
app.use(session({
  secret: 'ras',
  resave: true,
  secure: false,
  saveUninitialized: false,
}));

// router
// app.use('/', indexRouter);

// test용
app.get('/', (req, res) => {
  res.send('Hi6');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
