const { users, cards, projects, users_projects } = require('../models');
const { isAuthorized } = require('./token');

module.exports = {
    get: async (req, res) => {
        console.log(res.cookies)
        try {
            const verifyInfo = isAuthorized(req);
            if (verifyInfo === 'not found') {
                return res.status(401).send({ message: 'Not authorized' });
            } else if (verifyInfo === 'expired') {
                return res.status(401).send({ message: 'Expired token' });
            } else {
                const result = await projects.findAll({
                    include: [
                        {
                            model: users_projects,
                            required: true,
                            attributes: []
                        }
                    ],
                    where: {
                        '$users_projects.userId$': verifyInfo.id
                    }
                });
                res.status(200).json({ data: result, message: 'Get project list success' });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    post: async (req, res) => {
        const { userId, title, desc, isTeam, memberUserId } = req.body;
        if (!userId || !title || !desc || !isTeam || !memberUserId || memberUserId.length === 0) {
            return res.status(422).json({ message: "Insufficient parameters supplied" });
        }
        try {
            const result = await projects.create({ admin: userId, title, desc, isTeam });
            await memberUserId.map(function (el) {
                if (el === Number(userId)) {
                    users_projects.create({
                        userId: el,
                        projectId: result.id,
                        isAccept: true
                    });
                } else {
                    users_projects.create({
                        userId: el,
                        projectId: result.id,
                        isAccept: false
                    });
                }
            });
            res.status(201).json({ message: "Create project success" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    patch: async (req, res) => {
        const { projectId, title, desc } = req.body;
        if (!projectId || !title || !desc) {
            return res.status(422).json({ message: "Insufficient parameters supplied" });
        }
        try {
            await projects.update({
                title: title,
                desc: desc
            }, {
                where: { id: projectId },
            })
            res.status(200).json({ message: "Change project success" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id
        try {
            await projects.destroy({
                where: { id: id },
            });
            await users_projects.destroy({
                where: { projectId: id },
            })
            res.status(200).json({ message: "Delete project success" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    member: async (req, res) => {
        const { email } = req.body;
        if (!email) {
            return res.status(422).json({ message: "Insufficient parameters supplied" });
        }
        try {
            const userInfo = await users.findOne({
                where: {
                    email: email
                }
            });
            if (!userInfo) {
                res.status(200).json({ data: null, message: 'Not found user' });
            } else {
                const result = {
                    id: userInfo.dataValues.id,
                    email: userInfo.dataValues.email
                };
                res.status(201).json({ data: result, message: 'Found user' });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    accept: async (req, res) => {
        const { userId, projectId, isAccept } = req.body;
        if (!userId || !projectId || isAccept === undefined) {
            return res.status(422).json({ message: "Insufficient parameters supplied" });
        } else {
            try {
                if (isAccept) {
                    await users_projects.update({
                        isAccept: true,
                    }, {
                        where: {
                            userid: userId,
                            projectId: projectId
                        },
                    })
                    return res.status(200).json({ message: "Accept" })
                } else {
                    await users_projects.destroy({
                        where: {
                            userid: userId,
                            projectId: projectId
                        },
                    })
                    return res.status(200).json({ message: "Refuse" })
                }
            } catch (error) {
                console.log(error)
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
};