const { cards } = require("../models");

module.exports = {
    post: async (req, res) => {
        const { userId, projectId, content } = req.body;
        if (!userId || !projectId || !content) {
            return res
                .status(422)
                .json({ message: "Insufficient parameters supplied" });
        } else {
            try {
                await cards.create(
                    {
                        userId: userId,
                        projectId: projectId,
                        content: content,
                        storage: "card",
                    });
                res.status(201).json({ message: 'Create card success' });
            } catch (err) {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    },

    get: async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const cardInfo = await cards.findAll({ where: { projectId } });
            res.status(200).json({ data: cardInfo, message: 'Get card list success' });
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    delete: async (req, res) => {
        try {
            const cardId = req.params.id;
            await cards.destroy({ where: { id: cardId } });
            res.status(200).json({ message: 'Delete card success' });
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};