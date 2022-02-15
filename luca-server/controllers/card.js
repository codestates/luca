const { users, cards, projects } = require("../models");

module.exports = {
    post: async (req, res) => {
        const { email, title, content } = req.body;
        const userInfo = await users.findOne({
            where: {
                email,
            },
        });
        const projectInfo = await projects.findOne({
            where: {
                title,
            },
        });

        await cards.create(
            {
                projectId: projectInfo.id,
                userId: userInfo.id,
                content: content,
                storage: "card",
            });

        res.status(201).json({ message: 'ok' });
    },

    get: async (req, res) => {
        const projectId = req.params.projectId;
        const cardInfo = await cards.findAll({ where: { projectId } });
        res.status(200).json({ data: cardInfo, message: 'ok' });
    },

    delete: async (req, res) => {
        const cardId = req.params.id;
        const result = await cards.destroy({ where: { id: cardId } });
        // result가 0 과 1로 나옴
        if (!result) {
            res.status(400).json({ message: 'invalid id' });
        } else {
            res.status(200).json({ data: result, message: 'ok' });
        }
    }
};