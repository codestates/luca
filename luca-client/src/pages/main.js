import { Navigator, Backdrop, Container } from "../components/commons";

export function Main() {
  return (
    <div>
      <Navigator />
      <Backdrop>
        <Container>this is Main page</Container>
      </Backdrop>
    </div>
  );
}

export default Main;
