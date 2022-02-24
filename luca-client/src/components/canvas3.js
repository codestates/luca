import { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { radialNodes, radialLinkes } from "./d3coodinator/getDescendants";

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
  padding: 1em;
  background-color: ${(props) => (props.id === 0 ? "lightyellow" : "white")};
  border-radius: ${(props) => (props.id === 0 ? "2em" : "0.2em")};
  top: ${(props) => {
    return String(props.coordY) + "px";
  }};
  left: ${(props) => {
    return String(props.coordX) + "px";
  }};
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: ${(props) => (props.id === 0 ? "1.2em" : "1em")};
  font-weight: ${(props) => (props.id === 0 ? "700" : "normal")};
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.3);
  color: rgb(50, 50, 50);
`;

console.log("radialNodes: ", radialNodes);
console.log("radialLinkes: ", radialLinkes);
//console.log("links: ", links);

export default function Canvas3() {
  let projectIdRef = window.location.href.split("/").reverse()[0]; // projectIdRef === '12'(string)
  // Route flow 는 App > /project 이고, Link flow 는 App > Main > Projectcard > /project 로 서로 달라서
  // Projectcard 에서 선택한 projectId 를 <Project> 컴포넌트에 전달하기가 어렵습니다.
  // 1. (전체 라우팅 구조와 엔드포인트를 바꾸거나 (ex. /main/project/12) ) / 2. 선택한 프로젝트의 id 를 react-redux state 로 관리해 넘겨주는 방법.
  // 1 은 시간 리스크가 너무 크고, 2 는 비동기 처리를 위해 리팩토링 규모가 너무 커집니다.
  // 따라서 라우팅 된 endpoint로 들어와서, endpoint에서 porjectIdRef 를 추출해 axios 요청을 보내는 방식으로 작성했습니다.
  // console.log("ProjectID Cardboard: ", porjectIdRef);

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
          </Controller>

          <TransformComponent>
            <Container>
              {radialNodes.map((node, i) => (
                <Exbox
                  key={i}
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
