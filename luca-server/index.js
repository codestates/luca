const express = require("express");
const app = express();
const port = 80;

// Routes
// const indexRouter = require('./routes');

// Middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// router
// app.use('/', indexRouter);

// test용
app.get('/', (req, res) => {
  res.send('Hi');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
