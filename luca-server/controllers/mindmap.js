const { cards } = require("../models");
const { treeModel } = require("./convertTree");

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

        function findParent(id) {
            for (let i = 0; i < result.length; i++) {
                if (result[i].id === id) {
                    cards.update(
                        {
                            parent: null,
                            storage: 'card'
                        },{ where: {
                                id: result[i].id
                            }
                        }
                    )
                }
                else if (result[i].parent === id) {
                    cards.update(
                        {
                            parent: null,
                            storage: 'card'
                        },{ where: {
                                id: result[i].id
                            }
                        }
                    )
                    findParent(result[i].id)
                }
            }
            return;
        }
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
        const mindmapTree = treeModel(result, 0);
        return mindmapTree[0];
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
