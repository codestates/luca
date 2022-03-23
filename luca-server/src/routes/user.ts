import * as express from "express";
import * as controller from "../controllers/user";
import { kakaoLogin } from "../controllers/kakao";
import { googleLogin } from "../controllers/google";
import { naverLogin } from "../controllers/naver";
const router = express.Router();

router.get("/guest", controller.guest);
router.get("/logout", controller.logout);
router.post("/signup", controller.signup);
router.post("/checkAndMail", controller.checkAndMail);
router.post("/login", controller.login);
router.post("/kakao", kakaoLogin);
router.post("/google", googleLogin);
router.post("/naver", naverLogin);

export default router;