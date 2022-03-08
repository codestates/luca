const { cards } = require("../models");
const { treeModel } = require("./convertTree");

module.exports = {
    add: async (data) => {
        await cards.update(
            {
                parent: data.parentId,
                storage: "mindmap"
            }, {
            where: {
                id: data.cardId
            }
        }
        )
    },

    delete: async (data, projectId) => {
        const result = await cards.findAll({
            where: {
                storage: "mindmap",
                projectId: projectId
            },
            raw: true
        });
        const mindmapTree = treeModel(result, 0);
        const array = [data.cardId];
        const findId = (tree) => {
            if (array.includes(tree.parent)) {
                array.push(tree.id);
            }
            if (tree.children !== undefined) {
                for (let i = 0; i < tree.children.length; i++) {
                    findId(tree.children[i]);
                }
            }
        };
        findId(mindmapTree[0]);
        await cards.update(
            {
                parent: null,
                storage: "card"
            }, {
            where: {
                id: array
            }
        }
        )
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
    },
};