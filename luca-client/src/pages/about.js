import { Navigator, Backdrop, Container } from "../components/commons";

export default function About() {
  return (
    <div>
      <Navigator />
      <Backdrop>
        <Container>this is About page</Container>
      </Backdrop>
    </div>
  );
}
