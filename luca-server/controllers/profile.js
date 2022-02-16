const { users, cards, projects, users_projects } = require('../models');
const { isAuthorized } = require('./token');
const bcrypt = require('bcrypt');

module.exports = {
    get: async (req, res) => {
        try {
            const verifyInfo = isAuthorized(req);
            if (verifyInfo === 'not found') {
                return res.status(401).send({ message: 'Not authorized' });
            } else if (verifyInfo === 'expired') {
                return res.status(401).send({ message: 'Expired token' });
            } else {
                const userInfo = await users.findOne({
                    where: {
                        email: verifyInfo.email
                    }
                });
                delete userInfo.dataValues.password;

                res.status(200).json({ data: userInfo, message: 'Get profile success' });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    delete: async (req, res) => {
        try {
            const verifyInfo = isAuthorized(req);
            if (verifyInfo === 'not found') {
                return res.status(401).send({ message: 'Not authorized' });
            } else if (verifyInfo === 'expired') {
                return res.status(401).send({ message: 'Expired token' });
            } else {
                const userInfo = await users.findOne({
                    where: {
                        email: verifyInfo.email
                    }
                });

                if (userInfo) {
                    await users.destroy({
                        where: { id: userInfo.id },
                    })
                    await cards.destroy({
                        where: { userId: userInfo.id },
                    })
                    await users_projects.destroy({
                        where: { userId: userInfo.id },
                    })
                    await projects.destroy({
                        where: { admin: userInfo.id },
                    });

                    res.clearCookie('jwt', {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                    }).status(200).json({ mssage: 'Delete profile success' });
                }
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    patchName: async (req, res) => {
        const name = req.body.name;
        if(!name) {
            return res.status(422).json({ message: "Insufficient parameters supplied" });
        }
        try {
            const verifyInfo = isAuthorized(req);
            if (verifyInfo === 'not found') {
                return res.status(401).send({ message: 'Not authorized' });
            } else if (verifyInfo === 'expired') {
                return res.status(401).send({ message: 'Expired token' });
            } else {
                await users.update({ name: name }, {
                    where: { id: verifyInfo.id }
                });
                res.status(200).json({ message: 'ok' });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    patchPassword: async (req, res) => {
        const { curPassword, newPassword } = req.body;
        if(!curPassword || !newPassword) {
            return res.status(422).json({ message: "Insufficient parameters supplied" });
        }
        try {
            const verifyInfo = isAuthorized(req);
            if (verifyInfo === 'not found') {
                return res.status(401).send({ message: 'Not authorized' });
            } else if (verifyInfo === 'expired') {
                return res.status(401).send({ message: 'Expired token' });
            } else {
                const userInfo = await users.findOne({
                    where: { id: verifyInfo.id }
                });

                const check = await bcrypt.compare(curPassword, userInfo.dataValues.password);

                if (!check) {
                    res.status(400).json({ message: 'Wrong password' });
                } else {
                    await users.update({ password: bcrypt.hashSync(newPassword, 10) }, {
                        where: { id: verifyInfo.id }
                    });
                    res.status(200).json({ message: 'ok' });
                }
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};