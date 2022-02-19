import styled from "styled-components";
import {
  requestKakaoLogin,
  requestNaverLogin,
  requestGoogleLogin,
} from "../api";
import { Navigator, Backdrop, Container } from "../components/commons";

const SignupPage = styled.div`
  /* border: solid; */
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  height: 60vh;
  /* background-color: seashell; */
`;
const Registrybox = styled.div`
  width: 1080px;
  /* width: 80%; */
  height: 90%;
  border: solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  > div {
    width: auto;
    margin-right: 220px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    > div {
      display: flex;
      flex-direction: row;
      > div {
        margin-right: 20px;
        font-size: 1.2rem;
      }
      > input {
        margin-right: 20px;
        width: 420px;
        height: 30px;
      }
      > dummy {
        width: 90px;
      }
      > button {
        width: 90px;
        height: 35px;
      }
    }
    > errm {
      margin-right: 110px;
    }
    > submit {
      margin-right: 240px;
      width: 200px;
      height: 30px;
      border: solid;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default function Signup() {
  return (
    <div>
      <Navigator />
      <Backdrop>
        <SignupPage>
          <h2>회원가입</h2>
          <Registrybox>
            <div>
              <div>
                <div>이메일</div>
                <input type="text" placeholder="이메일을 입력해주세요" />
                <button>인증</button>
              </div>
              <errm>errmessage</errm>
            </div>

            <div>
              <div>
                <div>이메일 인증</div>
                <input type="text" placeholder="코드를 입력해주세요" />
                <button>인증</button>
              </div>
              <errm>errmessage</errm>
            </div>

            <div>
              <div>
                <div>이름</div>
                <input type="text" placeholder="코드를 입력해주세요" />
                <dummy></dummy>
              </div>
              <errm>errmessage</errm>
            </div>

            <div>
              <div>
                <div>비밀번호</div>
                <input type="text" placeholder="코드를 입력해주세요" />
                <dummy></dummy>
              </div>
              <errm>errmessage</errm>
            </div>

            <div>
              <div>
                <div>비밀번호 확인</div>
                <input type="text" placeholder="코드를 입력해주세요" />
                <dummy></dummy>
              </div>
              <errm>errmessage</errm>
            </div>

            <div>
              <submit>회원가입</submit>
            </div>
            <div>
              <submit onClick={requestKakaoLogin}>카카오</submit>
            </div>
            <div>
              <submit onClick={requestGoogleLogin}>구글</submit>
            </div>
            <div>
              <submit onClick={requestNaverLogin}>네이버</submit>
            </div>
          </Registrybox>
        </SignupPage>
      </Backdrop>
    </div>
  );
}
