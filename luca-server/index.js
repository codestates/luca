import express from "express";
import "express-async-errors";
import morgan from "morgan";

const app = express();
const port = 80;

app.use(express.json()); 햣
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// test용
app.get('/', (req, res) => {
  res.send('Hi123');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
