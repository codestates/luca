import { useEffect, useRef } from "react/cjs/react.development";
import { select, hierarchy, tree, linkVertical } from "d3";
import styled from "styled-components";

const data = {
  name: "Ymir",
  children: [
    {
      name: "Eren",
      children: [{ name: "Armin" }, { name: "Erwin" }],
    },
    { name: "Mikasa" },
    {
      name: "Levi",
      children: [{ name: "Falco" }, { name: "Ani" }],
    },
    {
      name: "Reiner",
      children: [{ name: "Historia" }, { name: "Bertoldt" }, { name: "Sasha" }],
    },
  ],
};

const dimensions = [400, 400];

const root = hierarchy(data);
const treeLayout = tree()
  .size(dimensions)
  .separation((a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth);
treeLayout(root);

// 모든 노드 배열
let descendants = root.descendants();

// 모든 링크 배열
let links = root.links();

// 링크가 렌더된 컴포넌트
// const LinkagesContainer = styled.div

function Linkages() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const linkGenerator = linkVertical()
      .source((link) => link.source)
      .target((link) => link.target)
      .x((node) => node.x)
      .y((node) => node.y);
    console.log("links: ", links);

    svg
      .selectAll(".link")
      .data(links)
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", linkGenerator)
      .attr("stroke-dasharray", function () {
        const length = this.getTotalLength();
        return `${length} ${length}`;
      })
      .attr("stroke-dashoffset", function () {
        const length = this.getTotalLength();
        return `${length}`;
      })
      .transition()
      .duration(1000)
      .delay((linkObj) => linkObj.source.depth * 1000)
      .attr("stroke-dashoffset", 0);
  }, []);

  return (
    <svg
      ref={svgRef}
      style={({ positions: "relative" }, { width: "100%" }, { height: "100%" })}
    ></svg>
  );
}

export { descendants, Linkages };
