const { cards } = require("../models");

module.exports = {
    connect: () => {
        return '';
    },
    disconnect: () => {
        return '';
    },
    alone: () => {
        return '';
    },
    get: async (projectId) => {
        const result = await cards.findAll({
            where: {
                storage: "mindmap",
                projectId: projectId
            },
            raw: true
        })
        return result;
    }
};