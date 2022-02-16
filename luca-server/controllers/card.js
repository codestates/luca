const { users, cards, projects } = require("../models");
const { isAuthorized } = require('./token');

module.exports = {
    post: async (req, res) => {
        try {
            const { projectId, content } = req.body;
            const verifyInfo = isAuthorized(req);

            await cards.create(
                {
                    projectId: projectId,
                    userId: verifyInfo.id,
                    content: content,
                    storage: "card",
                });
            res.status(201).json({ message: 'ok' });
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    get: async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const cardInfo = await cards.findAll({ where: { projectId } });
            res.status(200).json({ data: cardInfo, message: 'ok' });
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    delete: async (req, res) => {
        try {
            const cardId = req.params.id;
            const result = await cards.destroy({ where: { id: cardId } });
            // result가 0 과 1로 나옴
            if (!result) {
                res.status(400).json({ message: 'invalid id' });
            } else {
                res.status(200).json({ data: result, message: 'ok' });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};