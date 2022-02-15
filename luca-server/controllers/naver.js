require('dotenv').config();
const axios = require('axios');
const bcrypt = require("bcrypt");

axios.defaults.withCredentials = true;
const { users } = require('../models');
const { generateAccessToken, sendAccessToken } = require('./token');

// function getRandomBadge(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
// }

module.exports = {
    //로그인 및 회원가입

    naver: async (req, res, next) => {
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
                        username: nickname,
                    },
                    defaults: {
                        name: email.split('@')[0],
                        password: bcrypt.hashSync('password', 10),
                        isGuest: false,
                    },
                });
                delete newUserInfo.dataValues.password;
                // if (created) {
                //     const randombadge = getRandomBadge(1, 20);
                //     const obtainBadge = await UserBadgeModel.create({
                //         user_id: newUserInfo.id,
                //         badge_id: randombadge,
                //         is_selected: true,
                //     });
                //     const updateBadge = await UserModel.update(
                //         {
                //             badge_id: randombadge,
                //         },
                //         { where: { email: email } }
                //     );
                // }

                const userInfoInToken = await users.findOne({
                    attributes: [
                        'id',
                        'name',
                        'email',
                        'isGuest',
                    ],
                    where: {
                        email: email,
                    },
                });
                const { id, name, isGuest } =
                    userInfoInToken;
                const accessToken = generateAccessToken(
                    JSON.stringify({
                        id,
                        name,
                        email,
                        isGuest,
                    })
                );
                sendAccessToken(res, accessToken, 200, {
                    data: newUserInfo,
                    message: "login success",
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