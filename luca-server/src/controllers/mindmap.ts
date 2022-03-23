import { Cards } from "../models/cards";
import { treeModel } from "./convertTree";

export const add = async (data: { parentId: number, cardId: number }) => {
    await Cards.update(
        {
            parent: data.parentId,
            storage: "mindmap"
        }, {
        where: {
            id: data.cardId
        }
    })
}

export const remove = async (data: { cardId: number }, projectId: number) => {
    const result = await Cards.findAll({
        where: {
            storage: "mindmap",
            projectId: projectId
        },
        raw: true
    });
    const mindmapTree = treeModel(result, 0);
    const array = [data.cardId];
    const findId = (tree: { id: number, parent: number, children: [] }) => {
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
    await Cards.update(
        {
            parent: null,
            storage: "card"
        }, {
        where: {
            id: array
        }
    }
    )
}

export const get = async (projectId: number) => {
    const result = await Cards.findAll({
        where: {
            storage: "mindmap",
            projectId: projectId
        },
        raw: true
    })
    const mindmapTree = treeModel(result, 0);
    return mindmapTree[0];
}