import * as express from "express";
import profileRouter from "./profile";
import projectRouter from "./project";
import userRouter from "./user";

const router = express.Router();

router.use("/profile", profileRouter);
router.use("/project", projectRouter);
router.use("/user", userRouter);

export default router;