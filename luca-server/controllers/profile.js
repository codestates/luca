const { isAuthorized } = require("./token");
module.exports = {
    get: (req, res) => {
        const userInfo = isAuthorized({
            cookies: {
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjQ0NjQ4NTE4LCJleHAiOjE2NDU5NDQ1MTh9.OHlql0c6WzxJqYY6C-uVLmt14ByMWzDwgv-ICGNtBA0'
            }
        });
        delete userInfo.iat;
        delete userInfo.exp;
        delete userInfo.password;

        res.status(200).json({ data: userInfo, message: 'ok'});
    },
    delete: (req, res) => {

        res.status(200).json({ message: 'ok'});
    },
    patchName: (req, res) => {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjQ0NjQ4NTE4LCJleHAiOjE2NDU5NDQ1MTh9.OHlql0c6WzxJqYY6C-uVLmt14ByMWzDwgv-ICGNtBA0';
        const name = res.body.name;

        // DB연동 작업
        res.status(200).json({ message: name});
    },
    patchPassword: (req, res) => {
        res.send('ok');
    },
};