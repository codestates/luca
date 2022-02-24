import * as d3 from "d3";
import styled from "styled-components";
import { useState, useRef, useEffect, Component } from "react";
import { root, nodes, links } from "./d3coodinator/getDescendants";
import { useSelector, useDispatch } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// export class Canvas extends Component() {
  // const Frame = styled.div`
  //   width: 100%;
  //   height: 100%;
  //   background-color: lightsalmon;
  //   /* border: solid red 3px; */
  //   text-align: center;
  //   overflow: hidden;
  // `;
  // const MapContainer = styled.div`
  //   position: relative;
  //   background-color: lightgrey;
  //   top: 0;
  //   left: 0;
  //   width: ${(props) => 200 / props.viewRatio}%;
  //   height: ${(props) => 200 / props.viewRatio}%;
  //   transform: scale(${(props) => props.viewRatio});
  //   transform-origin: left top; // todo: 커서위치 props로 줄 것
  //   text-align: left;
  //   > svg {
  //   }
  // `;

  // const drag = (simulation) => {
  //   function dragstarted(event, d) {
  //     if (!event.active) simulation.alphaTarget(0.3).restart();
  //     d.fx = d.x;
  //     d.fy = d.y;
  //   }

  //   function dragged(event, d) {
  //     d.fx = event.x;
  //     d.fy = event.y;
  //   }

  //   function dragended(event, d) {
  //     if (!event.active) simulation.alphaTarget(0);
  //     d.fx = null;
  //     d.fy = null;
  //   }

  //   return d3
  //     .drag()
  //     .on("start", dragstarted)
  //     .on("drag", dragged)
  //     .on("end", dragended);
  // };

  // // const canvasRef = useRef();
  // // const svgRef = useRef();

  // const [viewRatio, setViewRatio] = useState(1);
  // const [screen, setScreen] = useState({
  //   top: 0,
  //   left: 0,
  // });
  // const mapConRef = useRef();

  // useEffect(() => {
    //console.log(mapConRef.current.offsetWidth);
  // }, []);

  // const wheelHandler = (e) => {
  //   if (viewRatio >= 0.2) {
  //     setViewRatio(viewRatio + 0.001 * e.deltaY);
  //   } else {
  //     setViewRatio(0.2);
  //   }
  //   //console.log("viewRatio: ", viewRatio);
  //   //console.log("mapConRef: ", mapConRef.current.offsetWidth);
  // };

  // let posX,
  //   posY = 100;

  // const panScreenStart = (e) => {
  //   const img = new Image();
  //   e.dataTransfer.setDragImage(img, 0, 0);
  //   posX = e.clientX;
  //   posY = e.clientY;
  // };

  // const panScreen = (e) => {
  //   const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
  //   const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

  //   e.target.style.left = limitX
  //     ? `${e.target.offsetLeft + (e.clientX - posX)}px`
  //     : "0px";
  //   e.target.style.top = limitY
  //     ? `${e.target.offsetTop + (e.clientY - posY)}px`
  //     : "0px";

  //   posX = limitX ? e.clientX : 0;
  //   posY = limitY ? e.clientY : 0;
  // };

  // const panScreenEnd = (e) => {
  //   const limitX = e.target.offsetLeft + (e.clientX - posX) <= 0;
  //   const limitY = e.target.offsetTop + (e.clientY - posY) <= 0;

  //   e.target.style.left = limitX
  //     ? `${e.target.offsetLeft + (e.clientX - posX)}px`
  //     : "0px";
  //   e.target.style.top = limitY
  //     ? `${e.target.offsetTop + (e.clientY - posY)}px`
  //     : "0px";

  //   setScreen({ top: e.target.style.top, left: e.target.style.left });
  // };

  // const root = d3.hierarchy(data);

  // useEffect(() => {
  //   // const svg = d3.select(svgRef.current);
  //   // const fild = d3.select(canvasRef.current);
  //   // const svg = fild.create('svg')
  //   //   .attr("viewBox", [-100 / 2, -100 / 2, 100, 100]);
  //   // console.log(nodes, links, root); 데이터 잘 들어옴
  //   console.log(root)
  //   console.log(nodes, links)
  //   const simulation = d3.forceSimulation(nodes)
  //   .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
  //   .force("charge", d3.forceManyBody().strength(-50))
  //   .force("x", d3.forceX())
  //   .force("y", d3.forceY());
  //   const svg = d3
  //     .select("page")
  //     .append("svg")
  //     .attr("width", 1600)
  //     .attr("height", 1000)
  //     // .attr("preserveAspectRatio", "none") //박스 사이즈에 맞게 비율 조정
  //     .attr("viewBox", [-300, -200, 600, 400]);
  //   // svg.attr("width", "100%");
  //   // svg.attr("height", "100%");
  //   const link = svg
  //     .append("g")
  //     .attr("stroke", "#999")
  //     .attr("stroke-opacity", 0.6)
  //     .selectAll("line")
  //     .data(links)
  //     .join("line");
  //   const node = svg
  //     .append("g")
  //     .attr("fill", "#fff")
  //     .attr("stroke", "#000")
  //     .attr("stroke-width", 1)
  //     .selectAll("circle")
  //     .data(nodes)
  //     .join("circle")
  //     .attr("fill", (d) => (d.children ? null : "#000"))
  //     .attr("stroke", (d) => (d.children ? null : "#fff"))
  //     .attr("r", 2)
  //       // .append("text")
  //       // .text(d => d.data.name)
  //       // .attr("font-size", "10px")
  //     .call(drag(simulation));
  //     const label = svg
  //       .append("g")
  //       .attr("font-size", "6px")
  //       .attr("font-family", "sans-serif")
  //       .attr("fill", "#000")
  //       .attr("text-anchor", "end")
  //       .selectAll("text")
  //       .data(nodes)
  //       .join("text")
  //       // .attr("dy", "0.35em") 
  //       .text(d => d.data.name)
  //       // .attr("cx", (d) => d.x)
  //       // .attr("cy", (d) => d.y);
  //       .call(drag(simulation))
      
      
  //   simulation.on("tick", () => {
  //     link
  //       .attr("x1", (d) => d.source.x)
  //       .attr("y1", (d) => d.source.y)
  //       .attr("x2", (d) => d.target.x)
  //       .attr("y2", (d) => d.target.y);
  //     node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  //     label.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  //   });
  // });
// export default Canvas;

// const Examplebox = styled.div`
//   top: ${(props) => props.coordY};
//   left: ${(props) => props.coordX};
// `;

const Container = styled.div`
  margin-top: 10vh;
  width: 90vw;
  height: 90vh;
  border: solid red 1px;
`;

const Controller = styled.div`
  position: fixed;
  bottom: 3vh;
  width: 10vh;
  height: 10vh;
  background: cyan;
`;


// const Line = styled.div`
//   top: ${(props) => {
//     return String(props.x1) + "px";
//   }};
//   left: ${(props) => {
//     return String(props.y1) + "px";
//   }};
// `;

export default function Canvas() {
  // const drag = (simulation) => {
  //   function dragstarted(event, d) {
  //     if (!event.active) simulation.alphaTarget(0.3).restart();
  //     d.fx = d.x;
  //     d.fy = d.y;
  //   }
  // }
  const svgRef = useRef();
  const titleRef = useRef();
  const lineRef = useRef();

  const handleClick  = () => {
    console.log("CLiCKeD!!!!!!!!!!!!")
  }

  useEffect(() => {

    // const simulation = d3.forceSimulation(nodes)
    // .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
    // .force("charge", d3.forceManyBody().strength(-50))
    // .force("x", d3.forceX())
    // .force("y", d3.forceY());
    
    // // const svg = d3.selectAll("svg");
    // // const title = d3.selectAll("title");
    // const title = titleRef;
    // const link = d3.selectAll("line");
    // // const link = lineRef;

    // simulation.on("tick", () => {
    //   link
    //   .data(nodes)
    //   .join("link")
    //     .attr("x1", (d) => d.source.x)
    //     .attr("y1", (d) => d.source.y)
    //     .attr("x2", (d) => d.target.x)
    //     .attr("y2", (d) => d.target.y);
      // title.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      // label.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    // });
  const svg = d3.selectAll("svg")
    .attr("width", "90%")
    .attr("height", "90%")
    .attr("viewBox", [-400, -300, 800, 600]);

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y));
  
  svg.append("g")
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
      `)
      .on("click", handleClick)
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 2.5);

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90}) 
        translate(${d.y},0) 
        rotate(${d.x >= Math.PI ? 180 : 0})
      `)
      .on("click", handleClick) ////////////////////////onClick
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .text(d => d.data.name)
    .clone(true).lower()
      .attr("stroke", "white");

  }, [])
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <Controller />
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
            {/* {console.log(links, nodes, svgRef.current)} */}
            <Container>
              <svg></svg>
            </Container>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}


// {
//   nodes.map((el) => {
//     return (
//       // <svg>
//       <node
//       coordX={el.x}
//       coordY={el.y}
//       >{el.data.name}</node>
//       // </svg>
//     )
//   })
// }
// {
//   links.map((el) => {
//     return (
//       // <svg>
//       <link
//       coordX1={el.source.x}
//       coordY1={el.source.y}
//       coordX2={el.target.x}
//       coordY2={el.target.y}
//       ></link>
//       // </svg>
//     )
//   })
// }


// {
//   nodes.map((el) => {
//     return (<svg><g
//       cx={el.x}
//       cy={el.y}
//       stroke="black"
//       fill="#fff"
//       r="10"
//     ></g></svg>)
//   })
// }
// {
//   nodes.map((el) => {
//     return (<svg
//       cx={el.x}
//       cy={el.y}
//       stroke="red"
//     >{el.data.name}</svg>)
//   })
// }
// {
//   links.map((el) => {
//     return (<svg 
//       x1={el.source.x} 
//       y1={el.source.y}
//       x2={el.target.x}
//       y2={el.target.y}
//     ></svg>)
//   })
// }