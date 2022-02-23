import { useEffect, useRef } from "react/cjs/react.development";
import { select, hierarchy, tree, linkRadial, cluster, selectAll } from "d3";

const rawData = {
  name: "Ymir",
  children: [
    {
      name: "Eren",
      children: [{ name: "Armin" }, { name: "Erwin" }, { name: "Annie" }],
    },
    { name: "Mikasa" },
    {
      name: "Reiner",
      children: [
        { name: "Historia" },
        { name: "Bertoldt" },
        { name: "Sasha", children: [{ name: "Zeke" }, { name: "Grisha" }] },
      ],
    },
  ],
};

// const dimensions = [window.innerWidth * 0.8, window.innerHeight * 0.8];
const dimensions = [window.innerWidth * 0.4, window.innerHeight * 0.4];
// d3 좌표가 펼쳐질 공간의 너비와 높이입니다.

const root = hierarchy(rawData);
// 트리구조 자료를 받아 Node로 변환합니다

const treeLayout = cluster()
  // cluster() -> Dendogram / tree() -> Depth diagram
  .size([360, window.innerHeight * 0.4])
  //.size(dimensions)
  .separation((a, b) => (a.parent === b.parent ? 1 : 1) / a.depth);
//.size([2 * Math.PI, (window.innerHeight * 0.8) / 2])

treeLayout(root);
//console.log("treeLayout: ", treeLayout(root));

let nodes = root.descendants();

let radialNodes = nodes.map((node) => {
  let angle = ((node.x - 90) / 180) * Math.PI;
  let radius = node.y;
  return {
    ...node,
    x: radius * Math.cos(angle) + window.innerWidth / 2 - 100,
    y: radius * Math.sin(angle) + window.innerHeight / 2,
  };
});

let links = root.links();

function transformer(x, y) {
  let angle = ((x - 90) / 180) * Math.PI;
  let radius = y;
  return {
    x: radius * Math.cos(angle) + window.innerWidth / 2 - 100,
    y: radius * Math.sin(angle) + window.innerHeight / 2,
  };
}

let radialLinkes = links.map((path) => {
  return {
    source: transformer(path.source.x, path.source.y),
    target: transformer(path.target.x, path.target.y),
  };
});

//console.log("nodes: ", nodes);
//console.log("links: ", links);
//console.log("transformed: ", radialTransformed);

export { root, nodes, radialNodes, radialLinkes, links, rawData };
