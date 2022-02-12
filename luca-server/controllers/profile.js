module.exports = {
    get: (req, res) => {
        const userInfo = {
            name: "홍길동",
            email: 'hong@gmail.com',
            isGuest: false
        }
        console.log(req.cookies);

        res.status(200).json({ data: userInfo, message: 'ok'});
    },
    delete: (req, res) => {

        res.status(200).json({ message: 'ok'});
    },
    patchName: (req, res) => {
        const accessToken = req.cookies.jwt;
        const name = res.body.name;

        // DB연동 작업
        res.status(200).json({ message: 'ok'});
    },
    patchPassword: (req, res) => {
        res.send('ok');
    },
};