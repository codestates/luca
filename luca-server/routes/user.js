const router = require('express').Router();
const controller = require('../controllers/user');
const googleController = require('../controllers/google')
const kakaoController = require('../controllers/kakao')
const naverController = require('../controllers/naver')

router.get('/guest', controller.guest);
router.get('/logout', controller.logout);
router.post('/signup', controller.signup);
router.post('/checkAndMail', controller.checkAndMail);
router.post('/login', controller.login);
router.post('/auth/kakao', kakaoController.kakao);
router.post('/auth/google', googleController.google);
router.post('/auth/naver', naverController.naver);

module.exports = router;