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
    delete: async (data, roomName) => {
        const result = await cards.findAll({
            where: {
                storage: "mindmap",
                projectId: roomName
            },
            raw: true
        })
        // 해당 id의 카드와 그 카드를 부모로 같는 id를 조회한다.
        // 조회한 카드의 부모를 없애고 storage를 card로 바꾼다.
        await cards.update(
            {
                parent: null,
                storage: 'card'
            },{ where: {
                    parent: data
                }
            }
        )
        await cards.update(
            {
                parent: null,
                storage: 'card'
            },{ where: {
                    id: data
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
        const mindmapTree = treeModel(result, 0);
        return mindmapTree[0];
    }
};