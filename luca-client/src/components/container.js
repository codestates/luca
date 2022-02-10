import styled from "styled-components";

const Backdrop = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: grey;
  justify-content: center;
  display: flex;
`;

const ContainerBody = styled.div`
  height: 100%;
  background-color: lightyellow;
  flex: 1 0 auto;
  max-width: 1320px;
  margin: auto;
`;

export default function Container() {
  return (
    <Backdrop>
      <ContainerBody>this is ContainerBody</ContainerBody>
    </Backdrop>
  );
}
