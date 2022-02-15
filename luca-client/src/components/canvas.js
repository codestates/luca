/*
import { useRef, useEffect } from "react";
import {
  select,
  hierarchy,
  tree,
  linkRadial,
  linkHorizontal,
  linkVertical,
} from "d3";
import styled from "styled-components";

const Frame = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
  margin: 0.5rem;
  border: solid black 1px;
  text-align: center;
`;

const dimensions = ["600px", "600px"];

const Mapper = styled.svg`
  width: ${(props) => props.dimensions[0] || "600px"};
  height: ${(props) => props.dimensions[1] || "600px"};
  background-color: lightyellow;
  border: solid black 1px;
`;

const Ex = styled.div`
  width: 100px;
  height: 50px;
  background-color: cyan;
  text-align: center;
`;

function Canvas() {
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
        children: [
          { name: "Historia" },
          { name: "Bertoldt" },
          { name: "Sasha" },
        ],
      },
    ],
  };

  let diameter = dimensions[1] * 0.75;
  let radius = diameter / 2;
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const root = hierarchy(data);
    const treeLayout = tree()
      .size([400, 400])
      .separation((a, b) => (a.parent === b.parent ? 1 : 0.1) / a.depth);
    treeLayout(root);

    // console.log("data: ", data); // 초기데이터
    // console.log("root: ", root); // Node 화된 데이터
    // console.log("descendants: ", root.descendants()); // f:descendants 실행결과: 모든 노드들로 이뤄진 1차원 배열
    // console.log("link: ", root.links()); // f:links 실행결과: 모든 연결 객체({source, target})로 이뤄진 1차원 배열

    const linkGenerator = linkVertical()
      .source((link) => link.source)
      .target((link) => link.target)
      .x((node) => node.x)
      .y((node) => node.y);

    svg
      .selectAll(".node")
      .data(root.descendants())
      .join("circle")
      .attr("class", "node")
      .attr("r", 10)
      .attr("fill", "green")
      .attr("cx", (node) => node.x)
      .attr("cy", (node) => node.y);

    svg
      .selectAll(".link")
      .data(root.links())
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

    svg
      .selectAll(".label")
      .data(root.descendants())
      .join("text")
      .attr("class", "label")
      .text((node) => node.data.name)
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .attr("x", (node) => node.x)
      .attr("y", (node) => node.y);

    console.log("root: ", root);
  }, [data]);

  return (
    <Frame>
      <div>this is Canvas</div>
      <Mapper dimensions={dimensions} ref={svgRef}>
        <Ex></Ex>
      </Mapper>
    </Frame>
  );
}

export default Canvas;
*/

import { useRef, useEffect, useState } from "react";
import { root, descendants, links } from "./d3coodinator/getDescendants";
import styled from "styled-components";
import { link } from "d3";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightsalmon;
  border: solid red 3px;
  text-align: center;
  overflow: hidden;
`;

const MapContainer = styled.div`
  position: relative;
  background-color: yellow;
  top: 0;
  left: 0;
  width: ${(props) => 200 / props.viewRatio}%;
  height: ${(props) => 200 / props.viewRatio}%;
  transform: scale(${(props) => props.viewRatio});
  transform-origin: left top; // todo: 커서위치 props로 줄 것
  text-align: left;
`;

const ExBox = styled.div`
  position: absolute;
  width: 50px;
  height: 30px;
  left: ${(props) => `${props.coord[0]}px`};
  top: ${(props) => `${props.coord[1]}px`};
  border: solid black 1px;
  background-color: cyan;
`;

console.log("root :", root);
console.log("descendants :", descendants[0]);
console.log("links :", links);

function Canvas() {
  const [viewRatio, setViewRatio] = useState(1);
  const [screen, setScreen] = useState({
    top: 0,
    left: 0,
  });
  const mapConRef = useRef();

  useEffect(() => {
    //console.log(mapConRef.current.offsetWidth);
  }, []);

  const wheelHandler = (e) => {
    if (viewRatio >= 0.2) {
      setViewRatio(viewRatio + 0.001 * e.deltaY);
    } else {
      setViewRatio(0.2);
    }
    //console.log("viewRatio: ", viewRatio);
    //console.log("mapConRef: ", mapConRef.current.offsetWidth);
  };

  let posX,
    posY = 100;

  const panScreenStart = (e) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    posX = e.clientX;
    posY = e.clientY;
  };

  const panScreen = (e) => {
    const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
    const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

    e.target.style.left = limitX
      ? `${e.target.offsetLeft + (e.clientX - posX)}px`
      : "0px";
    e.target.style.top = limitY
      ? `${e.target.offsetTop + (e.clientY - posY)}px`
      : "0px";

    posX = limitX ? e.clientX : 0;
    posY = limitY ? e.clientY : 0;
  };

  const panScreenEnd = (e) => {
    const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
    const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

    e.target.style.left = limitX
      ? `${e.target.offsetLeft + (e.clientX - posX)}px`
      : "0px";
    e.target.style.top = limitY
      ? `${e.target.offsetTop + (e.clientY - posY)}px`
      : "0px";

    setScreen({ top: e.target.style.top, left: e.target.style.left });
  };

  return (
    <Frame>
      {/* <MapContainer
        ref={mapConRef}
        viewRatio={viewRatio}
        onDoubleClick={(e) => alert([e.clientX, e.clientY])}
        onWheel={wheelHandler}
        onDragStart={panScreenStart}
        onDrag={panScreen}
        onDragEnd={panScreenEnd}
        draggable
      >
        {descendants.map((node) => (
          <ExBox key={node.data.name} coord={[node.x, node.y]}>
            {node.data.name}
          </ExBox>
        ))}
      </MapContainer> */}
    </Frame>
  );
}

export default Canvas;
