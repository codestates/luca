import { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { radialNodes, radialLinkes } from "./d3coodinator/getDescendants";
import { select, hierarchy, tree, linkRadial, cluster, selectAll } from "d3";
import { useSelector } from "react-redux";
import Timer from './timer';

const Container = styled.div`
  width: 99vw;
  height: 99vh;
  border: solid red 1px;
`;

const Controller = styled.div`
  z-index: 999;
  position: fixed;
  left: 2vh;
  top: 13vh;
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
`;

const Exbox = styled.div`
  position: fixed;
  padding: 1em;
  background-color: ${(props) => (props.parent === 0 ? "lightyellow" : "white")};
  border-radius: ${(props) => (props.parent === 0 ? "2em" : "0.2em")};
  top: ${(props) => {
    return String(props.coordY) + "px";
  }};
  left: ${(props) => {
    return String(props.coordX) + "px";
  }};
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: ${(props) => (props.parent === 0 ? "1.2em" : "1em")};
  font-weight: ${(props) => (props.parent === 0 ? "700" : "normal")};
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.3);
  color: rgb(50, 50, 50);
`;

console.log("radialNodes: ", radialNodes);
console.log("radialLinkes: ", radialLinkes);
//console.log("links: ", links);

export default function Canvas3({ addMindmapHandler }) {
let projectIdRef = window.location.href.split("/").reverse()[0]; // projectIdRef === '12'(string)

const rawData = useSelector((state) => state.user.mindmapTree);

const root = hierarchy(rawData);
const treeLayout = cluster()
  .size([360, window.innerHeight * 0.4])
  .separation((a, b) => (a.parent === b.parent ? 1 : 1) / a.depth);
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

  

  const [disabled, setDisabled] = useState(false);
  // 화면이 pan 되지 않으면서 마인드맵의 노드를 drag하기 위해 필요합니다.
  // 마인드맵의 노드를 onDragStart 이벤트시에는 TransformWrapper 의 disabled={true},
  // onDragEnd 이벤트시에는 TransformWrapper 의 disabled = {false} 로 바꿔줘야 합니다.
  const blockHandler = () => {
    setDisabled(!disabled);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("dropped on node", e.target.id);
    addMindmapHandler(e.target.id);
    console.log("dropped on node! node id: ", e.target.id);
    // 노드에 드롭 시 노드 id를 가져왔습니다. 이제 mindmap 데이터에서 노드 id를 찾아 자식노드로 추가해줘야합니다.
  };

  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
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

          <TransformComponent>
            <Container>
              {radialNodes.map((node, i) => (
                <Exbox
                  key={node.data.id}
                  parent={node.data.parent}
                  id={node.data.id}
                  coordY={node.y}
                  coordX={node.x}
                  //onClick={blockHandler}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`- dragover in node (id: ${e.target.id}) -`);
                  }}
                  // onDragOver -> onDrop
                  onDrop={dropHandler}
                >
                  {node.data.content}
                </Exbox>
              ))}
              <svg width={"100vw"} height={"100vh"}>
                {radialLinkes.map((link, i) => {
                  return (
                    <line
                      key={i}
                      x1={link.source.x}
                      y1={link.source.y}
                      x2={link.target.x}
                      y2={link.target.y}
                      stroke="lightgrey"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </Container>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}
