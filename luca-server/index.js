require('dotenv').config();
const express = require("express");
<<<<<<< HEAD
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
// const bcrypt = require("bcrypt");
=======
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const morgan = require('morgan');
const cors = require('cors');
>>>>>>> ca8b7177e2828e43301703f144e069ce05c8ab84

const app = express();
const port = process.env.PORT;

// Routes 
const indexRouter = require('./routes');

// Middle-ware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(cookieParser());
=======
// app.use(cookieParser());
>>>>>>> ca8b7177e2828e43301703f144e069ce05c8ab84
app.use(
  cors({
    origin: true,
    method: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  }),
);
<<<<<<< HEAD
app.use(session({
  secret: 'ras',
  resave: true,
  secure: false,
  saveUninitialized: false,
}));
=======
// app.use(session({
//   secret: 'ras',
//   resave: true,
//   secure: false,
//   saveUninitialized: false,
// }));
>>>>>>> ca8b7177e2828e43301703f144e069ce05c8ab84

// router
app.use('/', indexRouter);

// test용
app.get('/', (req, res) => {
  res.send('2345');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
