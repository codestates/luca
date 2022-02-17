const arrayList = [
    {
        id:	0,
        projectId: 1,
        userId: 1,
        content: 'mother',
        parent: 0,
        storage: 'mindmap'
    },
    {
        id:	1,
        projectId: 1,
        userId: 1,
        content: 'root',
        parent: 1,
        storage: 'mindmap'
    },
    {
        id: 3,
        projectId: 1,
        userId: 1,
        content: 'path1',
        parent: 2,
        storage: 'mindmap'
    },
    {
        id:	4,
        projectId: 1,
        userId: 1,
        content: 'path1-1',
        parent: 3,
        storage: 'mindmap'
    },
    {
        id:	5,
        projectId: 1,
        userId: 1,
        content: 'path1-2',
        parent: 3,
        storage: 'mindmap'
    },
    {
        id:	6,
        projectId: 1,
        userId: 1,
        content: 'path1-2-1',
        parent: 5,
        storage: 'mindmap'
    },
    {
        id:	7,
        projectId: 1,
        userId: 1,
        content: 'path2',
        parent: 2,
        storage: 'mindmap'
    },
    {
        id:	8,
        projectId: 1,
        userId: 1,
        content: 'path3',
        parent: 1,
        storage: 'mindmap'
    },
    {
        id:	9,
        projectId: 1,
        userId: 1,
        content: 'path3-1',
        parent: 8,
        storage: 'mindmap'
    },
]

let treeModel = function (arrayList, rootId) {
    let rootNodes = [];
    let traverse = function (nodes, card, index) {
        if (nodes instanceof Array) {
            return nodes.some(function (node) {
                if (node.id === card.parent) {
                    node.children = node.children || [];
                    return node.children.push(arrayList.splice(index, 1)[0]);
                }

                return traverse(node.children, card, index);
            });
        }
    };

    while (arrayList.length > 0) {
        arrayList.some(function (card, index) {
            console.log(card, index)
            if (card.parent === rootId) {
                return rootNodes.push(arrayList.splice(index, 1)[0]);
            }

            return traverse(rootNodes, card, index);
        });
    }

    return rootNodes;
};

const result = treeModel(arrayList, 0);
console.log(result)