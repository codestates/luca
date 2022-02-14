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
    kakao: async (req, res, next) => {
        try {
            const authorizationCode = req.body.authorizationCode;
            const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
            const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
            const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
            const grantType = 'authorization_code';
            if (authorizationCode) {
                const response = await axios({
                    method: 'POST',
                    url: `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${KAKAO_REST_API_KEY}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&grant_type=${grantType}`,
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                });
                const { access_token } = response.data;
                const kakaoUserInfo = await axios({
                    method: 'GET',
                    url: 'https://kapi.kakao.com/v2/user/me',
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                });

                const { email } = kakaoUserInfo.data.kakao_account;

                const [newUserInfo, created] = await users.findOrCreate({
                    where: {
                        email: email,
                    },
                    defaults: {
                        name: email.split('@')[0],
                        password: bcrypt.hashSync('password', 10),
                        isGuest: false,
                    },
                });
                // const userId = await users.findOne({
                //     where: { email: email },
                //     attributes: ['id'],
                //     raw: true,
                // });
                delete newUserInfo.dataValues.password;

                // if (created) {
                //     const randombadge = getRandomBadge(1, 20);
                //     const obtainBadge = await UserBadgeModel.create({
                //         user_id: userId.id,
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