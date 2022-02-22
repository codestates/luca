import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";

const Container = styled.div`
  top: 10vh;
  height: 90vh;
  width: 90vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  border: solid red 1px;
`;
const Box = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.backColor ? props.backColor : "blue")};
  margin: 5px;
`;
const Toolbox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: calc(100vw - 60px);
  margin-bottom: 10px;
  button {
    margin-left: 10px;
    width: 2em;
  }
`;
export default function Canvas2() {
  const renderBoxes = () => {
    let i;
    let arr = [];
    for (i = 0; i < 30; i++) {
      arr.push(<Box key={"b" + i} />);
      arr.push(<Box key={"r" + i} backColor="red" />);
      arr.push(<Box key={"y" + i} backColor="yellow" />);
      arr.push(<Box key={"g" + i} backColor="gray" />);
    }
    return arr;
  };
  return (
    <TransformWrapper
      defaultScale={1}
      defaultPositionX={200}
      defaultPositionY={100}
    >
      <>
        <Toolbox>
          <button>+</button>
          <button>-</button>
          <button>x</button>
        </Toolbox>
        <TransformComponent>
          <Container>{renderBoxes()}</Container>
        </TransformComponent>
      </>
    </TransformWrapper>
  );
}
