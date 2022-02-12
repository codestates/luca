const bcrypt = require('bcrypt');

module.exports = {
    guest: (req, res) => {
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync('password', salt);
        res.send(password);
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
        res.send('ok');
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