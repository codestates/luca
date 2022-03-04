require("dotenv").config();

const { users } = require("../models");
const { generateAccessToken, sendAccessToken } = require("./token");
const bcrypt = require("bcrypt");
const axios = require("axios");

axios.defaults.withCredentials = true;

module.exports = {
    login: async (req, res, next) => {
        try {
            const GOOGLE_REST_API_KEY = process.env.GOOGLE_REST_API_KEY;
            const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
            const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
            const code = req.body.authorizationCode;
            if (code) {
                const response = await axios({
                    method: "POST",
                    url: `https://oauth2.googleapis.com/token?code=${code}&client_id=${GOOGLE_REST_API_KEY}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                    },
                });

                const { access_token } = response.data;
                const googleUserInfo = await axios({
                    method: "GET",
                    url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.data.access_token}`,
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/x-www-form-urlencoded",
                    },
                });

                const { email } = googleUserInfo.data;
                const [newUserInfo, created] = await users.findOrCreate({
                    where: {
                        email: email,
                    },
                    defaults: {
                        name: email.split("@")[0],
                        password: bcrypt.hashSync("password", 10),
                        isGuest: false,
                        isSocial: "Google"
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
                message: "Internal server error",
            });
            next(err);
        }
    },
};