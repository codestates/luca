import styled from "styled-components";
import { Navigator, Backdrop, Container } from "../components/commons";

export default function ChangePassword() {
  const ChangePW = styled.div`
    /* border: solid; */
    height: 60vh;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    > registrybox {
      border: solid;
      width: 640px;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      > * {
        /* border: solid; */
        border-color: red;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        align-items: center;
        margin-top: 70px;
        > input {
          margin-right: 110px;
          width: 310px;
          height: 30px;
        }
        > div {
          margin-right: 20px;
          font-size: 1.2rem;
        }
      }
      > buttons {
        > div {
          margin-right: 110px;
          width: 90px;
          border: solid;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 70px;
        }
      }
    }
  `;

  return (
    <div>
      <Navigator />
      <Backdrop>
        <Container>
          <ChangePW>
            <h2>비밀번호 변경</h2>
            <registrybox>
              <current>
                <div>현재 비밀변호</div>
                <input type="text" placeholder="현재 비밀번호를 입력하세요." />
              </current>
              <new>
                <div>새 비밀번호</div>
                <input type="text" placeholder="새 비밀번호를 입력하세요." />
              </new>
              <confirm>
                <div>비밀번호 확인</div>
                <input type="text" placeholder="비밀번호를 확인하세요." />
              </confirm>
              <buttons>
                <div>취소</div>
                <div>저장</div>
              </buttons>
            </registrybox>
          </ChangePW>
        </Container>
      </Backdrop>
    </div>
  );
}
