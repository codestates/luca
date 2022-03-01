import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";
import styled from "styled-components";
//import { radialNodes, radialLinkes } from "./d3coodinator/getDescendants";
import { select, hierarchy, tree, linkRadial, cluster, selectAll } from "d3";
import { useSelector } from "react-redux";
import Finder from "./finder";
import Timer from "./timer";

const Container = styled.div`
  width: 99vw;
  height: 99vh;
  border: solid red 1px;
`;

const Controller = styled.div`
  z-index: 999;
  position: fixed;
  top: 13vh;
  left: 2vh;
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

const Nodebox = styled.div`
  z-index: 990;
  position: fixed;
  padding: 0.8em;
  background-color: ${(props) =>
    props.parent === 0 ? "lightyellow" : "white"};

  top: ${(props) => {
    return String(props.coordY) + "px";
  }};
  left: ${(props) => {
    return String(props.coordX) + "px";
  }};
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 4px;
  font-size: ${(props) =>
    props.parent === 0 ? props.nodeScale + 2 + "px" : props.nodeScale + "px"};
  font-weight: ${(props) => (props.parent === 0 ? "700" : "normal")};
  box-shadow: ${(props) =>
    props.highlights.includes(props.id)
      ? "0 0 4px red"
      : "0 0 4px rgba(0, 0, 0, 0.5)"};

  /* > div.text {
    background-color: ${(props) =>
    props.highlights.includes(props.id) ? "yellow" : "transparent"};
  } */

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
  > line {
    stroke: lightgrey;
    stroke-width: 1px;
  }
  stroke-dasharray: 500;
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

export default function Canvas3({ addMindmapHandler, deleteMindmapHandler }) {
  // let projectIdRef = window.location.href.split("/").reverse()[0]; // projectIdRef === '12'(string)
  const rawData = useSelector((state) => state.user.mindmapTree);

  const [pathData, setPathData] = useState([
    { id: rawData.id, content: rawData.content },
  ]);

  const [highlight, setHighlight] = useState({ list: [], word: "" });
  console.log("highlight: ", highlight);

  const [disabled, setDisabled] = useState(false);
  // 화면이 pan 되지 않으면서 마인드맵의 노드를 drag하기 위해 필요합니다.
  // 마인드맵의 노드를 onDragStart 이벤트시에는 TransformWrapper 의 disabled={true},
  // onDragEnd 이벤트시에는 TransformWrapper 의 disabled = {false} 로 바꿔줘야 합니다.

  const root = hierarchy(rawData);
  const treeLayout = cluster()
    .size([360, window.innerHeight * 0.4])
    .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
  treeLayout(root);

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

  const nodeScale = Math.pow(0.9, nodes[0].height) * 20;
  // 기본적인 scaler 모델입니다. 비율은 추후 ui에 따라 변경가능

  console.log("nodeScale: ", nodeScale);
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
      initialPositionX={-window.innerWidth * 0.45}
      initialPositionY={-window.innerHeight * 0.5}
      disabled={disabled}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <Controller>
            <button onClick={() => zoomIn()}>
              <i className="fa-solid fa-magnifying-glass-plus"></i>
            </button>
            <button onClick={() => zoomOut()}>
              <i className="fa-solid fa-magnifying-glass-minus"></i>
            </button>
            <button onClick={() => resetTransform()}>
              <i className="fa-solid fa-minimize"></i>
            </button>
            <button>
              <i className="fa-solid fa-clock-rotate-left"></i>
            </button>
            <button>
              <i className="fa-solid fa-border-all"></i>
            </button>
            <button onClick={blockHandler}>
              <i className="fa-solid fa-border-none"></i>
            </button>
            <Timer />
          </Controller>
          <Finder
            mapData={radialNodes}
            pathData={pathData}
            setHighlight={setHighlight}
          />

          <TransformComponent>
            <Container>
              {radialNodes.map((node, i) => (
                <Nodebox
                  key={i}
                  parent={node.data.parent}
                  id={node.data.id}
                  nodeScale={nodeScale}
                  coordY={node.y}
                  coordX={node.x}
                  highlights={highlight.list.map((node) => node.data.id)}
                  //onClick={blockHandler}
                  word={highlight.word}
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
            </Container>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}
