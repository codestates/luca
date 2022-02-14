const { users, cards, projects, users_projects } = require('../models');
const { isAuthorized } = require('./token');
const bcrypt = require('bcrypt');

module.exports = {
    get: async (req, res) => {
        req = {
            cookies: {
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjQ0NjQ4NTE4LCJleHAiOjE2NDU5NDQ1MTh9.OHlql0c6WzxJqYY6C-uVLmt14ByMWzDwgv-ICGNtBA0'
            }
        }

        if('jwt'in req.cookies){
            try {
                const verifyInfo = isAuthorized(req);
                console.log(verifyInfo)
                const userInfo = await users.findOne({
                    where: {
                        email: verifyInfo.email
                    }
                });
                console.log(userInfo.dataValues)
                delete userInfo.dataValues.password;
                res.status(200).json({ data: userInfo, message: 'ok'});

            } catch(err) {
                res.status(500).json({ message: "Internal server error" });
            }
        } else {
            return res.status(401).send({ message: 'Invalid token' });
        }
    },

    delete: async (req, res) => {
        req.cookies = {
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjQ0NjQ4NTE4LCJleHAiOjE2NDU5NDQ1MTh9.OHlql0c6WzxJqYY6C-uVLmt14ByMWzDwgv-ICGNtBA0'
        }
        if('jwt'in req.cookies){
            try {
                const verifyInfo = isAuthorized(req);
                verifyInfo.id = 3;

                const userInfo = await users.findOne({
                    where: {
                        userId: verifyInfo.userInfo.id
                    }
                })
                if (userInfo) {
                    await users.destroy({
                        where: { id: userInfo.id },
                    })
                    await cards.destroy({
                        where: { userId: userInfo.id },
                    })
                    await projects.destroy({
                        where: { userId: userInfo.id },
                    })
                    await users_projects.destroy({
                        where: { admin: userInfo.id },
                    })

                    res
                    .clearCookie('jwt', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                    })
                    .status(200).json({ mssage: 'ok' });
                }
            } catch {
                res.status(500).json({ message: "Internal server error" });
            }
        } else {
            return res.status(401).send({ message: 'Invalid token' });
        }
    },

    patchName: async (req, res) => {
        req.cookies = {
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjQ0NjQ4NTE4LCJleHAiOjE2NDU5NDQ1MTh9.OHlql0c6WzxJqYY6C-uVLmt14ByMWzDwgv-ICGNtBA0'
            }
        if('jwt'in req.cookies){
            const name = req.body.name;
            try {
                const verifyInfo = isAuthorized(req);
                //
                console.log(verifyInfo)
                verifyInfo.id = 3;
                //
                const userInfo = await users.update(
                    { name: name},
                    { where: { id: verifyInfo.id }
                });
                console.log(userInfo)
                //delete userInfo.dataValues.password;
                res.status(200).json({ message: 'ok'});

            } catch(err) {
                res.status(500).json({ message: "Internal server error" });
            }
        } else {
            return res.status(401).send({ message: 'Invalid token' });
        }
    },
    
    patchPassword: async (req, res) => {
        req.cookies = {
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjQ0NjQ4NTE4LCJleHAiOjE2NDU5NDQ1MTh9.OHlql0c6WzxJqYY6C-uVLmt14ByMWzDwgv-ICGNtBA0'
        }
        if('jwt'in req.cookies){
            const curPassword = res.body.curPassword;
            const newPassword = res.body.newPassword;
            try {
                const verifyInfo = isAuthorized(req);
                //
                console.log(verifyInfo)
                verifyInfo.id = 3;
                //
                // db조회 및 bcrypt 확인 작업 추가
                //
                const userInfo = await users.update(
                    { password: bcrypt.hashSync(newPassword, 10) },
                    { where: { id: verifyInfo.id }
                });
                console.log(userInfo)
                //delete userInfo.dataValues.password;
                res.status(200).json({ message: 'ok'});

            } catch(err) {
                res.status(500).json({ message: "Internal server error" });
            }
        } else {
            return res.status(401).send({ message: 'Invalid token' });
        }
    },
};