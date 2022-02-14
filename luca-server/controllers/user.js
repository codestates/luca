const { generateAccessToken, sendAccessToken } = require("./token");
module.exports = {
    guest: (req, res) => {
        const result = hashedpassword('password')
        res.send(result);
    },
    logout: (req, res) => {
        res.send('ok');
    },
    signup: (req, res) => {
        res.send('ok');
    },
    checkAndMail: (req, res) => {
        res.send('ok');
    },
    login: (req, res) => {
        const email = 'test@gmail.com';
        const password = '1234'
        const accessToken = generateAccessToken({
            dataValues: { email, password }
        });
        sendAccessToken(res, accessToken, 200, {
            message: "Login success",
        });
    },
    kakao: (req, res) => {
        res.send('ok');
    },
    google: (req, res) => {
        res.send('ok');
    },
    naver: (req, res) => {
        res.send('ok');
    },
};