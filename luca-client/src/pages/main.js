import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Projectcard from "../components/projectcard";
import { Navigator, Backdrop, Container } from "../components/commons";

const Maincomponent = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  > startbox {
    background-color: gray;
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    > startinfo {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    > startbuttom {
      border: solid;
      border-radius: 20px;
      width: 200px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  > projectcontainer {
    background-color: silver;
    height: 100vh;
    width: 1300px;
    display: flex;
    flex-direction: column;
    /* > projectcontainer> * {
        width: 1300px;
    } */
    > sortbox {
      /* background-color: red; */
      width: 100%;
      height: 30px;
      border-bottom: solid;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > div {
        margin-right: 10px;
      }
    }
    > projectbox {
      margin-top: 30px;
    }
  }
`;

export function Main() {
  return (
    <div>
      <Navigator />
      <Backdrop>
        <Container>
          <Maincomponent>
            <startbox>
              <startinfo>
                <h2>Lorem ipsum</h2>
                img elements must have an alt prop, either with meaningful text,
                or an empty string for decorative images
              </startinfo>
              <startbuttom>start</startbuttom>
            </startbox>
            <projectcontainer>
              <sortbox>
                <div>sort by update ▼</div>
              </sortbox>
              <projectbox>
                <Projectcard />
              </projectbox>
            </projectcontainer>
          </Maincomponent>
        </Container>
      </Backdrop>
      <div className="footer"></div>
    </div>
  );
}

export default Main;
