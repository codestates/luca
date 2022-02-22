import * as d3 from "d3";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { root, nodes, links } from "./d3coodinator/getDescendants";

export default function Canvas() {
  let porjectIdRef = window.location.href.split("/").reverse()[0]; // porjectIdRef === '12'(string)
  // Route flow 는 App > /project 이고, Link flow 는 App > Main > Projectcard > /project 로 서로 달라서
  // Projectcard 에서 선택한 projectId 를 <Project> 컴포넌트에 전달하기가 어렵습니다.
  // 1. (전체 라우팅 구조와 엔드포인트를 바꾸거나 (ex. /main/project/12) ) / 2. 선택한 프로젝트의 id 를 react-redux state 로 관리해 넘겨주는 방법.
  // 1 은 시간 리스크가 너무 크고, 2 는 비동기 처리를 위해 리팩토링 규모가 너무 커집니다.
  // 따라서 라우팅 된 endpoint로 들어와서, endpoint에서 porjectIdRef 를 추출해 axios 요청을 보내는 방식으로 작성했습니다.
  // console.log("ProjectID Canvas: ", porjectIdRef);

  const Frame = styled.div`
    width: 100%;
    height: 100%;
    background-color: lightsalmon;
    /* border: solid red 3px; */
    text-align: center;
    overflow: hidden;
  `;
  const MapContainer = styled.div`
    position: relative;
    background-color: lightgrey;
    top: 0;
    left: 0;
    width: ${(props) => 200 / props.viewRatio}%;
    height: ${(props) => 200 / props.viewRatio}%;
    transform: scale(${(props) => props.viewRatio});
    transform-origin: left top; // todo: 커서위치 props로 줄 것
    text-align: left;
    > svg {
    }
  `;

  const drag = (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  const canvasRef = useRef();
  const svgRef = useRef();

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

  // const root = d3.hierarchy(data);

  useEffect(() => {
    // const svg = d3.select(svgRef.current);
    // const fild = d3.select(canvasRef.current);
    // const svg = fild.create('svg')
    //   .attr("viewBox", [-100 / 2, -100 / 2, 100, 100]);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
          .strength(1)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .selectAll(".page")
      .append("svg")
      .attr("viewBox", [-100, -50, 200, 100]);

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", (d) => (d.children ? null : "#000"))
      .attr("stroke", (d) => (d.children ? null : "#fff"))
      .attr("r", 2)
      .call(drag(simulation));

    // node.append("title")
    //   // .text(d => d.data.content);
    //   .text('testData');

    const content = svg
      .append("g")
      .selectAll("title")
      .data(nodes)
      .join("title")
      .text((d) => d.data.name)
      .attr("dy", ".31em")
      .style("text-anchor", "middle")
      .attr("r", 2)
      .call(drag(simulation));

    // node.append("text")
    //   .attr("text", d => d.data.name);
    // const content = svg.append("g")
    // .selectAll("title")
    // .data(nodes)
    // .join("title")
    // link.append("text")
    // .attr("font-family", "Arial, Helvetica, sans-serif")
    // .attr("fill", "Black")
    // .style("font", "normal 12px Arial")
    // .attr("transform", function(d) {
    //     return "translate(" +
    //         ((d.source.y + d.target.y)/2) + "," +
    //         ((d.source.x + d.target.x)/2) + ")";
    // })
    // .attr("dy", ".35em")
    // .attr("text-anchor", "middle")
    // .text(function(d) {
    //     console.log(d.target.rule);
    //     return d.target.rule;
    // });

    // console.log(nodes);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      content.attr("cx", (d) => d.x + 10).attr("cy", (d) => d.y);
    });
  });

  return (
    <Frame>
      <MapContainer
        // viewRatio={viewRatio}
        // onDoubleClick={(e) => alert([e.clientX, e.clientY])}
        // onWheel={wheelHandler}
        // onDragStart={panScreenStart}
        // onDrag={panScreen}
        // onDragEnd={panScreenEnd}
        // draggable
        ref={canvasRef}
      >
        {/* <svg ref={svgRef} >
      </svg> */}
        <div className="page"></div>
      </MapContainer>
    </Frame>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useRef, useEffect, useState, } from "react";
// import { root, descendants, links } from "./d3coodinator/getDescendants";
// import styled from "styled-components";
// import { link } from "d3";

// const Frame = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: lightsalmon;
//   border: solid red 3px;
//   text-align: center;
//   overflow: hidden;
// `;

// const MapContainer = styled.div`
//   position: relative;
//   background-color: yellow;
//   top: 0;
//   left: 0;
//   width: ${(props) => 200 / props.viewRatio}%;
//   height: ${(props) => 200 / props.viewRatio}%;
//   transform: scale(${(props) => props.viewRatio});
//   transform-origin: left top; // todo: 커서위치 props로 줄 것
//   text-align: left;
// `;

// const ExBox = styled.div`
//   position: absolute;
//   width: 50px;
//   height: 30px;
//   left: ${(props) => `${props.coord[0]}px`};
//   top: ${(props) => `${props.coord[1]}px`};
//   border: solid black 1px;
//   background-color: cyan;
// `;

// console.log("root :", root);
// console.log("descendants :", descendants[0]);
// console.log("links :", links);

// function Canvas() {
//   const [viewRatio, setViewRatio] = useState(1);
//   const [screen, setScreen] = useState({
//     top: 0,
//     left: 0,
//   });
//   const mapConRef = useRef();

//   useEffect(() => {
//     //console.log(mapConRef.current.offsetWidth);
//   }, []);

//   const wheelHandler = (e) => {
//     if (viewRatio >= 0.2) {
//       setViewRatio(viewRatio + 0.001 * e.deltaY);
//     } else {
//       setViewRatio(0.2);
//     }
//     //console.log("viewRatio: ", viewRatio);
//     //console.log("mapConRef: ", mapConRef.current.offsetWidth);
//   };

//   let posX,
//     posY = 100;

//   const panScreenStart = (e) => {
//     const img = new Image();
//     e.dataTransfer.setDragImage(img, 0, 0);
//     posX = e.clientX;
//     posY = e.clientY;
//   };

//   const panScreen = (e) => {
//     const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
//     const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

//     e.target.style.left = limitX
//       ? `${e.target.offsetLeft + (e.clientX - posX)}px`
//       : "0px";
//     e.target.style.top = limitY
//       ? `${e.target.offsetTop + (e.clientY - posY)}px`
//       : "0px";

//     posX = limitX ? e.clientX : 0;
//     posY = limitY ? e.clientY : 0;
//   };

//   const panScreenEnd = (e) => {
//     const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
//     const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

//     e.target.style.left = limitX
//       ? `${e.target.offsetLeft + (e.clientX - posX)}px`
//       : "0px";
//     e.target.style.top = limitY
//       ? `${e.target.offsetTop + (e.clientY - posY)}px`
//       : "0px";

//     setScreen({ top: e.target.style.top, left: e.target.style.left });
//   };

//   return (
//     <Frame>
//       <MapContainer
//         ref={mapConRef}
//         viewRatio={viewRatio}
//         onDoubleClick={(e) => alert([e.clientX, e.clientY])}
//         onWheel={wheelHandler}
//         onDragStart={panScreenStart}
//         onDrag={panScreen}
//         onDragEnd={panScreenEnd}
//         draggable
//       >
//         {descendants.map((node) => (
//           <ExBox key={node.data.name} coord={[node.x, node.y]}>
//             {node.data.name}
//           </ExBox>
//         ))}
//       </MapContainer>
//     </Frame>
//   );
// }

// export default Canvas;
