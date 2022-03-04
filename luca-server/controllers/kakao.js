require('dotenv').config();

const { users } = require('../models');
const { generateAccessToken, sendAccessToken } = require('./token');
const bcrypt = require("bcrypt");
const axios = require('axios');

axios.defaults.withCredentials = true;


module.exports = {
    //로그인 및 회원가입
    login: async (req, res, next) => {
        try {
            const authorizationCode = req.body.authorizationCode;
            const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
            const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
            const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
            const grantType = 'authorization_code';

            if (authorizationCode) {
                console.log('========1========')
                const response = await axios({
                    method: 'POST',
                    url: `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${KAKAO_REST_API_KEY}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&grant_type=${grantType}&scope=profile_nickname,account_email`,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                });
                console.log('========2========')
                const { access_token } = response.data;
                console.log('========3========')
                const kakaoUserInfo = await axios({
                    method: 'GET',
                    url: 'https://kapi.kakao.com/v2/user/me',
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                });
                // return res.send(kakaoUserInfo.data)
                console.log('========4========')
                const { email } = kakaoUserInfo.data.kakao_account;
                const { nickname } = kakaoUserInfo.data.properties;
                console.log('========5========')
                const [newUserInfo, created] = await users.findOrCreate({
                    where: {
                        email: email,
                    },
                    defaults: {
                        name: nickname,
                        password: bcrypt.hashSync('password', 10),
                        isGuest: false,
                        isSocial: 'Kakao'
                    },
                });
                console.log('========6========')
                delete newUserInfo.dataValues.password;
                console.log('========7========')
                const userInfo = await users.findOne({
                    where: { email: email }
                });
                console.log('========8========')
                const accessToken = generateAccessToken(userInfo);
                console.log('========9========')
                sendAccessToken(res, accessToken, 200, {
                    data: newUserInfo,
                    message: "Login success",
                });
                console.log('========10========')
            }
        } catch (err) {
            console.log('========11========', err)
            res.status(500).send({
                message: 'Internal server error',
            });
            next(err);
        }
    },
};