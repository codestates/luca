const { cards } = require("../models");

module.exports = {
    add: async (data) => {
        await cards.update(
            {
                parent: data.parentId,
                storage: 'mindmap'
            },{ where: {
                    id: data.cardId
                }
            }
        )
        return '';
    },
    delete: async (data) => {
        const result = await cards.findAll({
            where: {
                storage: "mindmap",
                projectId: data.projectId
            },
            raw: true
        })
        console.log(result)
        await cards.update(
            {
                parent: null,
                storage: 'card'
            },{ where: {
                    id: data.cardId
                }
            }
        )
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


// module.exports = {
//     connect: (req, res) => {
//         res.send('ok');
//     },
//     disconnect: (req, res) => {
//         res.send('ok');
//     },
//     alone: (req, res) => {
//         res.send('ok');
//     },
//     get: (req, res) => {
//         res.send('ok');
//     },
// };