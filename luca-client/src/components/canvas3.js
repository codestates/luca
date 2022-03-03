import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";
import styled from "styled-components";
//import { radialNodes, radialLinkes } from "./d3coodinator/getDescendants";
import { select, hierarchy, tree, linkRadial, cluster, selectAll } from "d3";
import { useSelector } from "react-redux";
import Finder from "./finder";
import Timer from "./timer";

// const Container = styled.div`
//   width: 99vw;
//   height: 99vh;
//   border: solid red 1px;
//   overflow: visible;
// `;

const Controller = styled.div`
  z-index: 920;
  position: fixed;
  top: 120px;
  left: 20px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.3);
  display: flex;
  padding-bottom: 4px;
  flex-direction: column;
  justify-content: space-between;
  > button {
    flex: 1 0 auto;
    margin: 4px 4px 0 4px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: white;
    border: solid lightgrey 1px;
    color: rgb(160, 160, 160);

    > i {
      font-size: 1.5em;
    }
  }
  > button:hover {
    background-color: rgb(160, 160, 160);
    color: white;
  }
  > button:active {
    transform: translateY(2px);
  }
`;

const Scaler = styled.div`
  z-index: 920;
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: 50px;
  display: flex;
  flex-direction: column;
  background-color: cyan;
  > div {
    flex: 1 0 auto;
    display: flex;

    > div.index {
      width: 50px;
      background-color: green;
    }
    div.mod {
      width: 100px;
      background-color: blue;
      display: flex;
      justify-content: space-around;
    }
  }
`;

const Rootbox = styled.div`
  z-index: 910;
  position: fixed;
  top: ${(props) => {
    return String(props.coordY) + "px";
  }};
  left: ${(props) => {
    return String(props.coordX) + "px";
  }};
  padding: 0.8em;
  background-color: white;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: ${(props) =>
    props.highlights.includes(props.id)
      ? "0 0 6px red"
      : "0 0 6px rgba(0, 0, 0, 0.7)"};
`;

const Nodebox = styled.div.attrs(({ id, coordX, coordY, highlights }) => {
  return {
    style: {
      position: "fixed",
      left: coordX + "px",
      top: coordY + "px",
      boxShadow: highlights.includes(id)
        ? "0 0 6px red"
        : "0 0 6px rgba(0, 0, 0, 0.7)",
    },
  };
})`
  z-index: 900;
  background-color: ${(props) => props.color};
  padding: 0.8em;
  background-color: white;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 4px;
  font-size: 12px;

  > div.delete {
    display: none;
  }
  &:hover {
    z-index: 999;
    transform: translate(-50%, -50%) scale(1.5);
    > div.delete {
      display: ${(props) => (props.parent === 0 ? "none" : "block")};
      margin-top: 0.5em;
      font-size: 0.5em;
      border-radius: 0.3em;
      background-color: lightgrey;
      cursor: pointer;
    }
    > div.delete:hover {
      font-weight: bold;
      color: red;
    }
  }
`;

const Lines = styled.svg`
  width: 100vw;
  height: 100vh;
  overflow: visible;

  > line {
    stroke: rgb(180, 180, 180);
    stroke-width: 1px;
  }
  //stroke-dasharray: 500;
  stroke-dashoffset: 0;
  animation: dashDraw 1s linear 1;
  // props.depth * delay(1s)
  // useEffect ?

  @keyframes dashDraw {
    0% {
      stroke-dashoffset: 500;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

const ControllerPilot = styled.div`
  z-index: 990;
  display: ${(props) => (props.pilotOn ? "block" : "none")};
  position: fixed;
  z-index: 999;
  left: ${(props) => props.x + "px"};
  top: ${(props) => props.y + "px"};
  width: auto;
  height: 20px;
  padding: 6px 10px;
  border-radius: 16px;
  background-color: grey;
  color: white;
  border: black solid 1px;
  font-weight: bold;
`;

export default function Canvas3({
  addMindmapHandler,
  deleteMindmapHandler,
  timerHandler,
  setTime,
  time,
}) {
  // let projectIdRef = window.location.href.split("/").reverse()[0]; // projectIdRef === '12'(string)
  const rawData = useSelector((state) => state.user.mindmapTree);

  const [pathData, setPathData] = useState([
    { id: rawData.id, content: rawData.content },
  ]);

  const [mapForm, setMapForm] = useState("cluster");
  const [mapScale, setMapScale] = useState(2); // 마인드맵의 지름 비율
  const [highlight, setHighlight] = useState({ list: [], word: "" }); // 검색 시 하이라이트
  const [disabled, setDisabled] = useState(false); // 캔버스에서의 마우스 액션 허용/금지
  const [pilotCoord, setPilotCoord] = useState({ x: 0, y: 0 }); // 컨트롤러에 마우스 호버할 때의 안내 파일럿 위치
  const [pilotOn, setPilotOn] = useState(false); // 안내 파일럿 on-off
  const [pilotMessage, setPilotMessage] = useState("");

  const root = hierarchy(rawData);

  function switchMapFormation(form) {
    if (form === "cluster") {
      const treeLayout = cluster()
        .size([360, (window.innerHeight * root.height * mapScale) / 20]) // * 0.4
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

      return treeLayout(root);
    }
    if (form === "tree") {
      const treeLayout = tree()
        .size([360, (window.innerHeight * root.height * mapScale) / 10]) // * 0.4
        .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

      return treeLayout(root);
    }
  }

  switchMapFormation(mapForm);

  let nodes = root.descendants();
  //console.log("2. nodes: ", nodes);

  let radialNodes = nodes.map((node) => {
    let angle = ((node.x - 90) / 180) * Math.PI;
    let radius = node.y;
    return {
      ...node,
      x: radius * Math.cos(angle) + window.innerWidth / 2,
      y: radius * Math.sin(angle) + window.innerHeight / 2,
    };
  });

  //console.log("3. radialNodes: ", radialNodes);

  let links = root.links();

  function transformer(x, y) {
    let angle = ((x - 90) / 180) * Math.PI;
    let radius = y;
    return {
      x: radius * Math.cos(angle) + window.innerWidth / 2,
      y: radius * Math.sin(angle) + window.innerHeight / 2,
    };
  }

  let radialLinkes = links.map((path) => {
    return {
      source: transformer(path.source.x, path.source.y),
      target: transformer(path.target.x, path.target.y),
    };
  });

  //const nodeScale = Math.pow(0.95, nodes[0].height) * 18;
  // 기본적인 scale 모델입니다. 비율은 추후 ui에 따라 변경가능

  //console.log("radialNodes: ", radialNodes);
  //console.log("radialLinkes: ", radialLinkes);
  //console.log("links: ", links);

  const blockHandler = () => {
    setDisabled(!disabled);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("dropped on node", e.target.id);
    addMindmapHandler(e.target.id);
    console.log("dropped on node! node id: ", e.target);
    // 노드에 드롭 시 노드 id를 가져왔습니다. 이제 mindmap 데이터에서 노드 id를 찾아 자식노드로 추가해줘야합니다.
  };

  const pilotHandler = (e, dir, index) => {
    if (dir === "in") {
      setTimeout(() => {
        setPilotCoord({ x: e.clientX, y: e.clientY });
        setPilotMessage(index);
        console.log("target ", e.target);
        setPilotOn(true);
      }, 500);
    }
    if (dir === "out") {
      clearTimeout();
      setPilotCoord({ x: 0, y: 0 });
      setPilotOn(false);
    }
    return;
  };

  const simplified = (str) => {
    let viewLength = 10;
    if (str.length > viewLength) {
      return str.slice(0, viewLength) + "...";
    } else {
      return str;
    }
  };

  const findParent = (id, treeData) => {
    const rootContent = treeData.content;
    const array = [{ id: id }];
    const findId = (tree) => {
      if (tree.children !== undefined) {
        for (let i = 0; i < tree.children.length; i++) {
          findId(tree.children[i]);
        }
      }
      if (tree.id === array[0].id && tree.parent !== 0) {
        array.unshift({ id: tree.parent });
        array[1].content = tree.content;
      }
    };
    findId(treeData);
    array[0].content = rootContent;
    return array;
  };

  const pathHandler = (id) => {
    setPathData(findParent(id, rawData));
  };

  return (
    <TransformWrapper
      initialScale={2}
      initialPositionX={-window.innerWidth / 2}
      initialPositionY={-window.innerHeight / 2}
      limitToBounds={false}
      minScale={0.3}
      disabled={disabled}
      panning={{ excluded: ["nodebox"] }}
    >
      {({ zoomIn, zoomOut, setTransform, centerView }) => (
        <>
          <ControllerPilot pilotOn={pilotOn} x={pilotCoord.x} y={pilotCoord.y}>
            {pilotMessage}
          </ControllerPilot>
          <Controller>
            <button
              onClick={() => zoomIn()}
              onMouseEnter={(e) => pilotHandler(e, "in")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              <i className="fa-solid fa-magnifying-glass-plus"></i>
            </button>
            <button
              onClick={() => zoomOut()}
              onMouseEnter={(e) => pilotHandler(e, "in")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              <i className="fa-solid fa-magnifying-glass-minus"></i>
            </button>
            <button
              onClick={() =>
                centerView(
                  mapForm === "cluster" ? 1 : 1.8 / mapScale,
                  300,
                  "easeOut"
                )
              }
              onMouseEnter={(e) => pilotHandler(e, "in")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              <i className="fa-solid fa-expand"></i>
              {/* <i className="fa-solid fa-house"></i> */}
            </button>

            {mapForm === "cluster" ? (
              <button
                onClick={() => setMapForm("tree")}
                onMouseEnter={(e) => pilotHandler(e, "in")}
                onMouseLeave={(e) => pilotHandler(e, "out")}
              >
                <i className="fa-solid fa-maximize"></i>
              </button>
            ) : (
              <button
                onClick={() => setMapForm("cluster")}
                onMouseEnter={(e) => pilotHandler(e, "in")}
                onMouseLeave={(e) => pilotHandler(e, "out")}
              >
                <i className="fa-solid fa-minimize"></i>
              </button>
            )}

            <button
              onClick={blockHandler}
              onMouseEnter={(e) => pilotHandler(e, "in")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              {disabled ? (
                <i className="fa-solid fa-lock"></i>
              ) : (
                <i className="fa-solid fa-lock-open"></i>
              )}
            </button>
            <div
              onMouseEnter={(e) => pilotHandler(e, "in", "timer")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              <Timer
                timerHandler={timerHandler}
                setTime={setTime}
                time={time}
              />
            </div>
          </Controller>
          <Finder
            mapData={radialNodes}
            pathData={pathData}
            highlight={highlight}
            setHighlight={setHighlight}
            setTransform={setTransform}
          />
          <Scaler>
            <div>
              <div className="index">map</div>
              <div className="mod">
                <button onClick={() => setMapScale(mapScale - 1)}>-</button>
                <button onClick={() => setMapScale(mapScale + 1)}>+</button>
              </div>
            </div>
          </Scaler>
          <TransformComponent>
            {/* <Container> */}

            <Rootbox
              className="rootbox"
              id={radialNodes[0].data.id}
              coordY={radialNodes[0].y || window.innerHeight / 2}
              coordX={radialNodes[0].x || window.innerWidth / 2}
              highlights={highlight.list.map((node) => node.data.id)}
              onClick={() => pathHandler(radialNodes[0].data.id)}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={dropHandler}
            >
              {radialNodes[0].data.content}
            </Rootbox>

            {radialNodes.slice(1).map((node, i) => (
              <Nodebox
                className="nodebox"
                key={i}
                parent={node.data.parent}
                id={node.data.id}
                coordY={node.y}
                coordX={node.x}
                highlights={highlight.list.map((node) => node.data.id)}
                onClick={() => pathHandler(node.data.id)}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log(`- dragover in node (id: ${e.target.id}) -`);
                }}
                // onDragOver -> onDrop
                onDrop={dropHandler}
              >
                {!node.data.parent
                  ? node.data.content
                  : simplified(node.data.content)}

                <div
                  className="delete"
                  onClick={(e) => deleteMindmapHandler(e, node.data.id)}
                >
                  <i className="fa-solid fa-rectangle-xmark"></i>
                </div>
              </Nodebox>
            ))}

            <Lines>
              {radialLinkes.map((link, i) => {
                return (
                  <line
                    key={i}
                    x1={link.source.x}
                    y1={link.source.y}
                    x2={link.target.x}
                    y2={link.target.y}
                  />
                );
              })}
            </Lines>

            {/* </Container> */}
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}
