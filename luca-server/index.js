import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 80;

// Routes
import indexRouter from "./routes";

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
