module.exports ={
    treeModel: (arrayList, rootId) => {
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
    }
}