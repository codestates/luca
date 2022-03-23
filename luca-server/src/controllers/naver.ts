import { Request, Response, NextFunction } from "express";
import { generateAccessToken, sendAccessToken } from "./token";
import { Users } from "../models/users";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();

axios.defaults.withCredentials = true;

export const naverLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationCode = req.body.authorizationCode;

        const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
        const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

        const grantType = "authorization_code";
        if (authorizationCode) {
            const response = await axios({
                method: "POST",
                url: `https://nid.naver.com/oauth2.0/token?code=${authorizationCode}&state="Luca"&grant_type=${grantType}&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}`,
            });

            const { access_token } = response.data;
            const naverUserInfo = await axios({
                method: "GET",
                url: "https://openapi.naver.com/v1/nid/me",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-type": "text/json;charset=utf-8",
                },
            });
            const { email, nickname } = naverUserInfo.data.response;

            const [newUserInfo, created] = await Users.findOrCreate({
                where: {
                    email: email,
                    name: nickname,
                },
                defaults: {
                    name: nickname,
                    password: bcrypt.hashSync(process.env.BCRYPT_PASSWORD, parseInt(process.env.BCRYPT_SALT)),
                    isGuest: false,
                    isSocial: "Naver"
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