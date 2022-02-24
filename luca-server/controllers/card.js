const { cards } = require("../models");

module.exports = {
    create: async (userId, content, projectId) => {
        const result = await cards.create(
            {
                userId: userId,
                projectId: projectId,
                content: content,
                parent: null,
                storage: "card"
            });
        return result;
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

    delete: async (cardId) => {
        await cards.destroy({ where: { id: cardId } });
    },

};