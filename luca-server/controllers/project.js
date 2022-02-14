const { users, cards, projects, users_projects } = require('../models');
module.exports = {
    get: async (req, res) => {
        req = {
            cookies: {
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0IiwiaWF0IjoxNjQ0NjQ4NTE4LCJleHAiOjE2NDU5NDQ1MTh9.OHlql0c6WzxJqYY6C-uVLmt14ByMWzDwgv-ICGNtBA0'
            }
        }

        if ('jwt' in req.cookies) {
            try {
                const verifyInfo = isAuthorized(req);
                console.log(verifyInfo)
                verifyInfo.id = 3;
                const userInfo = await users.findOne({
                    where: {
                        email: verifyInfo.email
                    }
                });
                const result = await projects.findAll({
                    where: {
                        userId: userInfo.id
                    }
                });
                console.log(result.dataValues)
                res.status(200).json({ data: result, message: 'ok' });

            } catch (err) {
                res.status(500).json({ message: "Internal server error" });
            }
        } else {
            res.status(401).send({ message: 'Invalid token' });
        }
    },
    post: async (req, res) => {
        const projectInfo = req.body;
        try {
            const result = await projects.create({
                userId: projectInfo.userId,
                title: itemInfo.title,
                desc: itemInfo.desc,
                isTeam: itemInfo.isTeam
            });
            await projectInfo.memberUserId.map(function (el) {
                const result = users_projects.create({
                    userId: el,
                    projectId: result.id
                });
            });
            console.log(result)
            res.status(200).json({ message: "ok" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    patch: async (req, res) => {
        const { projectId, title, desc } = req.body;
        try {
            await projects.update({
                title: title,
                desc: desc
            },
                {
                    where: { id: projectId },
                })
            res.status(200).json({ message: "ok" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id
        try {
            await projects.destroy({
                where: { id: id },
            })
            res.status(200).json({ message: "ok" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
    member: async (req, res) => {
        const email = req.body.email
        try {
            const userInfo = await users.findOne({
                where: {
                    email: verifyInfo.email
                }
            });
            if (!userInfo) {
                res.status(402).json({ message: 'Not found user' });
            } else {
                const result = {
                    id: userInfo.id,
                    email: userInfo.email
                }
                res.status(200).json({ data: result, message: 'ok' });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
};