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

            const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
            const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

            const grantType = 'authorization_code';
            if (authorizationCode) {
                const response = await axios({
                    method: 'POST',
                    url: `https://nid.naver.com/oauth2.0/token?code=${authorizationCode}&state='Luca'&grant_type=${grantType}&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}`,
                });

                const { access_token } = response.data;
                const naverUserInfo = await axios({
                    method: 'GET',
                    url: 'https://openapi.naver.com/v1/nid/me',
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-type': 'text/json;charset=utf-8',
                    },
                });
                const { email, nickname } = naverUserInfo.data.response;

                const [newUserInfo, created] = await users.findOrCreate({
                    where: {
                        email: email,
                        name: nickname,
                    },
                    defaults: {
                        name: nickname,
                        password: bcrypt.hashSync('password', 10),
                        isGuest: false,
                        isSocial: 'Naver'
                    },
                });

                delete newUserInfo.dataValues.password;

                const userInfo = await users.findOne({
                    where: { email: email }
                });

                const accessToken = generateAccessToken(userInfo);

                sendAccessToken(res, accessToken, 200, {
                    data: newUserInfo,
                    message: "Login success",
                });
            }
        } catch (err) {
            res.status(500).send({
                message: 'Internal server error',
            });
            next(err);
        }
    },
};