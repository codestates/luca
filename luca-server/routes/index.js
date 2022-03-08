const express = require("express");
const router = express.Router();

const profileRouter = require("./profile");
const projectRouter = require("./project");
const userRouter = require("./user");

router.use("/profile", profileRouter);
router.use("/project", projectRouter);
router.use("/user", userRouter);

module.exports = router;