import styled from "styled-components";

const Navigator = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: cyan;
  text-align: center;
`;

const Backdrop = styled.div`
  width: 100vw;
  min-height: 90vh;
  height: auto;
  background-color: grey;
  justify-content: center;
  display: flex;
`;

const Container = styled.div`
  min-height: 90vh;
  height: auto;
  background-color: lightyellow;
  flex: 1 0 auto;
  max-width: 1320px;
  margin: auto;
`;

export { Navigator, Backdrop, Container };
