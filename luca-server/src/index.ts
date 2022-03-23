import * as dotenv from "dotenv";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import { Request, Response, Express } from "express";
import indexRouter from "./routes/index";

dotenv.config();
const app: Express = express();
const corsOption = {
  origin: true,
  method: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
  SameSite: "None",
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOption));

app.use("/", indexRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hi")
});

export default app;