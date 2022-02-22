import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";

const Container = styled.div`
  border: solid red 1px;
`;

const Controller = styled.div`
  z-index: 999;
  position: fixed;
  left: 3vh;
  bottom: 3vh;
  width: 30vw;
  height: 8vh;
  border-radius: 4vh;
  background: cyan;
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.2);
`;

export default function Canvas3() {
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
            <Container>
              <img src="https://picsum.photos/300/300?random=1" />
              <img src="https://picsum.photos/300/300?random=2" />
              <img src="https://picsum.photos/300/300?random=3" />
            </Container>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}
