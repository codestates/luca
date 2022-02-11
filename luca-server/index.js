import express from "express";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test용
app.get('/', (req, res) => {
  res.send('Helloword124');
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
