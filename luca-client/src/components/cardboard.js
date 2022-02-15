import styled from "styled-components";

const ExBoard = styled.div`
  z-index: 999;
  position: fixed;
  top: 15vh;
  right: 5vw;
  height: 50vh;
  background-color: green;
`;

export default function Cardboard() {
  return <ExBoard>this is Cardboard</ExBoard>;
}
