const express = require('express');
const router = express.Router();

const cardRouter = require('./card.js');
// const mindmapRouter = require('./mindmap');
const profileRouter = require('./profile');
const projectRouter = require('./project');
const userRouter = require('./user');

router.use('/card', cardRouter);
// router.use('/mindmap', mindmapRouter);
router.use('/profile', profileRouter);
router.use('/project', projectRouter);
router.use('/user', userRouter);

module.exports = router;