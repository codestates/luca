import { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import {
  links,
  nodes,
  radialNodes,
  radialLinkes,
} from "./d3coodinator/getDescendants";

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
`;

const Exbox = styled.div`
  position: fixed;
  min-width: 20vh;
  min-width: 10vh;
  background-color: white;
  border: ${(props) =>
    props.order === 0 ? "solid black 3px" : "solid black 1px"};
  top: ${(props) => {
    return String(props.coordY) + "px";
  }};
  left: ${(props) => {
    return String(props.coordX) + "px";
  }};
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: ${(props) => (props.order === 0 ? "bolder" : "normal")};
`;

console.log("radialNodes: ", radialNodes);
console.log("radialLinkes: ", radialLinkes);
//console.log("links: ", links);

export default function Canvas3() {
  // console.log("nodes: ", nodes);
  // console.log("links: ", links);
  const [disabled, setDisabled] = useState(false);
  const blockHandler = () => {
    setDisabled(!disabled);
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
          </Controller>

          <TransformComponent>
            <Container>
              {radialNodes.map((node, i) => (
                <Exbox
                  key={i}
                  order={i}
                  coordY={node.y}
                  coordX={node.x}
                  //onClick={blockHandler}

                  // onDragEnter={(e) => {
                  //   e.preventDefault();
                  //   e.stopPropagation();
                  //   console.log("node onDragEnter");
                  // }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("node dragover");
                  }}
                  // 추가한 이벤트. onDrop을 위해선 반드시 필요함
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("dropped on node");
                  }}
                >
                  {node.data.name}
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
