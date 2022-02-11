const express = require("express");

const app = express();
const port = 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test용
app.get('/', (req, res) => {
  res.send('Hi');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
