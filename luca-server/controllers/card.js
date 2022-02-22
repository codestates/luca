const { cards } = require("../models");

module.exports = {
    create: async (data) => {
        const { userId, projectId, content } = data;
        try {
            const result = await cards.create(
                {
                    userId: userId,
                    projectId: projectId,
                    content: content,
                    parent: null,
                    storage: "card"
                });
                console.log(result)
            return result;
        } catch (err) {
            return '';
        }
    },

    get: async (projectId) => {
        const cardInfo = await cards.findAll({ 
            where: { 
                projectId,
                storage: 'card'
            },
            raw: true
        });
        return cardInfo;
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