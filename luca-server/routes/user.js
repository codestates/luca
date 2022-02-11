const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/guest', controller.guest);
router.get('/logout', controller.logout);
router.post('/signup', controller.signup);
router.post('/checkAndMail', controller.checkAndMail);
router.post('/login', controller.login);
router.post('/auth/kakao', controller.kakao);
router.post('/auth/google', controller.google);
router.post('/auth/naver', controller.naver);

module.exports = router;