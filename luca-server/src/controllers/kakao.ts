import { Request, Response, NextFunction } from "express";
import { generateAccessToken, sendAccessToken } from "./token";
import { Users } from "../models/users";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

axios.defaults.withCredentials = true;

export const kakaoLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationCode = req.body.authorizationCode;
        const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
        const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
        const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
        const grantType = "authorization_code";

        if (authorizationCode) {
            const response = await axios({
                method: "POST",
                url: `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${KAKAO_REST_API_KEY}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&grant_type=${grantType}&scope=profile_nickname,account_email`,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
            });
            const { access_token } = response.data;
            const kakaoUserInfo = await axios({
                method: "GET",
                url: "https://kapi.kakao.com/v2/user/me",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-type": "application/x-www-form-urlencoded",
                },
            });
            const { email } = kakaoUserInfo.data.kakao_account;
            const { nickname } = kakaoUserInfo.data.properties;
            const [newUserInfo, created] = await Users.findOrCreate({
                where: {
                    email: email,
                },
                defaults: {
                    name: nickname,
                    password: bcrypt.hashSync(process.env.BCRYPT_PASSWORD, parseInt(process.env.BCRYPT_SALT)),
                    isGuest: false,
                    isSocial: "Kakao"
                },
            });
            const userInfo = await Users.findOne({
                where: { email: email }
            });
            const accessToken = generateAccessToken(userInfo.get({ plain: true}));
            sendAccessToken(res, accessToken, 200, {
                data: newUserInfo,
                message: "Login success",
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Internal server error",
        });
        next(err);
    }
}