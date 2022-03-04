import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useNavigate } from "react-router-dom";
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

const Exit = styled.div`
  > button {
    flex: 1 0 auto;
    margin: 4px 4px 0 4px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: white;
    border: none;
    color: rgb(160, 160, 160);
    cursor: pointer;

    > i {
      font-size: 1.5em;
    }
  }
  > button:active {
    transform: translateY(2px);
  }
`;
const Controller = styled.div`
  z-index: 930;
  position: fixed;
  top: 150px;
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
  z-index: 930;
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: 50px;
  display: flex;
  flex-direction: column;
  /* background-color: cyan; */
  input[type="range"] {
    -webkit-appearance: none;
    width: 60%;
    border-radius: 14px;
    height: 4px;
    border: 1px solid #bdc3c7;
    background: rgb(160, 160, 160);
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #ecf0f1;
    border: 1px solid #bdc3c7;
    width: 15px;
    height: 15px;
    border-radius: 10px;
    cursor: pointer;
  }
  ul.range-labels {
    margin: 18px -41px 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      float: left;
      width: 90.25px;
      text-align: center;
      color: #b2b2b2;
      font-size: 14px;
      cursor: pointer;
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
  transform: translate(-50%, -50%);
  background-color: white;
  text-align: center;
  line-height: 0.9em;
  inline-size: 8em;
  border-radius: 8em;
  box-shadow: ${(props) =>
    props.highlights.includes(props.id)
      ? "0 0 6px red"
      : "0 0 6px rgba(0, 0, 0, 0.7)"};

  > div.rootcontent {
    font-size: 0.6em;
    font-weight: 700;
    margin: 1em;
    word-break: keep-all;
  }
`;

const Nodebox = styled.div.attrs(({ id, coordX, coordY, highlights }) => {
  return {
    style: {
      position: "fixed",
      left: coordX + "px",
      top: coordY + "px",
      boxShadow: highlights.includes(id) ? "0 0 6px red" : "none",
    },
  };
})`
  z-index: 900;
  font-size: 0.5em;
  padding: 1em;
  border-radius: 2em;
  background-color: white;
  transform: translate(-50%, -50%);
  text-align: center;
  border: solid grey 1px;

  > div.small {
    display: block;
  }

  > div.large {
    display: none;
  }

  &:hover {
    z-index: 920;
    transform: translate(-50%, -50%) scale(1.5);
    > div.small {
      display: none;
    }

    > div.large {
      display: block;
      inline-size: 8em;
      line-height: 1.5em;
      word-break: break-word;

      > div.delete-node {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 1.45em;
        height: 1.45em;
        border-radius: 1em;
        background-color: white;

        > i {
          height: 100%;
          color: grey;
          cursor: pointer;
        }
        > i:hover {
          color: coral;
        }
      }
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
  z-index: 999;
  position: fixed;
  left: ${(props) => props.x + 10 + "px"};
  top: ${(props) => props.y + "px"};
  font-size: 0.8em;
  padding: 0.3em;
  border-radius: 0.1em;
  background-color: lightgrey;
  color: black;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
`;

export default function Canvas3({
  addMindmapHandler,
  deleteMindmapHandler,
  timerHandler,
  setTime,
  time,
}) {
  const navigate = useNavigate();

  // let projectIdRef = window.location.href.split("/").reverse()[0]; // projectIdRef === '12'(string)
  const rawData = useSelector((state) => state.user.mindmapTree);

  const [pathData, setPathData] = useState([
    { id: rawData.id, content: rawData.content },
  ]);

  const [mapForm, setMapForm] = useState("cluster");
  const [mapScale, setMapScale] = useState(2); // 마인드맵의 지름 비율
  const [highlight, setHighlight] = useState({ list: [], word: "" }); // 검색 시 하이라이트
  const [disabled, setDisabled] = useState(false); // 캔버스에서의 마우스 액션 허용/금지
  const [adjustScale, setAdjustScale] = useState(false); // 스케일 조절
  const [pilot, setPilot] = useState({
    // 일정시간 마우스 오버시 안내 파일럿
    on: false,
    coord: { x: 0, y: 0 },
    message: "",
  });

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
  // 기본적인 scale 모델입니다. 비율은 추후 ui에 따라 변경가능 -> 이제 mapScale 로 자동조정됩니다.

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

  let pilotTimerId = undefined;

  const pilotHandler = (e, dir, index) => {
    if (dir === "in") {
      pilotTimerId = setTimeout(() => {
        setPilot({
          on: true,
          coord: { x: e.clientX, y: e.clientY },
          message: index,
        });
      }, 0);
    }

    if (dir === "out") {
      clearTimeout(pilotTimerId);
      setPilot({
        on: false,
        coord: { x: 0, y: 0 },
        message: "",
      });
    }
    return;
  };

  const scaleHandler = (value) => {
    setMapScale(value);
  };

  const adjustScaleHandler = () => {
    setAdjustScale(!adjustScale);
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
      minScale={0.2}
      disabled={disabled}
      panning={{ excluded: [] }}
    >
      {({ zoomIn, zoomOut, setTransform, centerView }) => (
        <>
          {pilot.on ? (
            <ControllerPilot x={pilot.coord.x} y={pilot.coord.y}>
              {pilot.message}
            </ControllerPilot>
          ) : null}

          <Exit>
            <button onClick={() => navigate("/main")}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </Exit>

          <Controller>
            <button
              onClick={() => zoomIn()}
              onMouseEnter={(e) => pilotHandler(e, "in", "확대")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              <i className="fa-solid fa-magnifying-glass-plus"></i>
            </button>
            <button
              onClick={() => zoomOut()}
              onMouseEnter={(e) => pilotHandler(e, "in", "축소")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              <i className="fa-solid fa-magnifying-glass-minus"></i>
            </button>
            <button
              onClick={() => centerView(1 / mapScale, 300, "easeOut")} // radialNodes[0].height ? mapScale
              onMouseEnter={(e) => pilotHandler(e, "in", "중앙 정렬")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              <i className="fa-solid fa-expand"></i>
            </button>

            {mapForm === "cluster" ? (
              <button
                onClick={() => setMapForm("tree")}
                onMouseEnter={(e) => pilotHandler(e, "in", "동일한 간격")}
                onMouseLeave={(e) => pilotHandler(e, "out")}
              >
                <i className="fa-solid fa-equals"></i>
              </button>
            ) : (
              <button
                onClick={() => setMapForm("cluster")}
                onMouseEnter={(e) => pilotHandler(e, "in", "모양 유지")}
                onMouseLeave={(e) => pilotHandler(e, "out")}
              >
                <i className="fa-solid fa-maximize"></i>
              </button>
            )}

            <button
              onClick={blockHandler}
              onMouseEnter={(e) => pilotHandler(e, "in", "캔버스 고정")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              {disabled ? (
                <i className="fa-solid fa-lock"></i>
              ) : (
                <i className="fa-solid fa-lock-open"></i>
              )}
            </button>
            <button
              onClick={adjustScaleHandler}
              onMouseEnter={(e) => pilotHandler(e, "in", "스케일")}
              onMouseLeave={(e) => pilotHandler(e, "out")}
            >
              <i className="fa-solid fa-ruler-horizontal"></i>
            </button>
            {adjustScale ? (
              <div>
                <Scaler>
                  <ul class="range-labels">
                    <li>-</li>
                    <li>+</li>
                  </ul>
                  <input
                    type="range"
                    defaultValue={2}
                    min="2"
                    max="5"
                    step="1"
                    onChange={(e) => scaleHandler(e.target.value)}
                  />
                </Scaler>
              </div>
            ) : null}
            <div
              onMouseEnter={(e) => pilotHandler(e, "in", "타이머")}
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
              <div className="rootcontent" id={radialNodes[0].data.id}>
                {radialNodes[0].data.content}
              </div>
            </Rootbox>

            {radialNodes.slice(1).map((node, i) => (
              <Nodebox
                className="nodebox"
                key={i}
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
                <div className="small" id={node.data.id}>
                  {simplified(node.data.content)}
                </div>
                <div className="large">
                  <div
                    className="delete-node"
                    onClick={(e) => deleteMindmapHandler(e, node.data.id)}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </div>
                  {node.data.content}
                </div>

                {/* <div
                  className="delete"
                  onClick={(e) => deleteMindmapHandler(e, node.data.id)}
                >
                  <i className="fa-solid fa-rectangle-xmark"></i>
                </div> */}
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
