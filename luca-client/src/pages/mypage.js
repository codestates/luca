import { useState } from "react";
import styled from "styled-components";
import { Navigator, Backdrop, Container } from "../components/commons";

const Page = styled.div`
  display: flex;
  justify-content: center;
`;
const MypageBody = styled.div`
  background-color: seashell;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1300px;
  > userinfo {
    > userprofile {
      display: flex;
      flex-direction: column;
      > h1 {
        height: 25px;
      }
      > input {
        width: 40%;
        height: 30px;
        margin-bottom: 10px;
      }
    }
    > div {
      margin-top: 20px;
      width: 420px;
    }
  }
  > profileimg {
    width: 300px;
  }
`;
const Userbutton = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
  > modifybutton {
    width: 200px;
  }
  > changepwbutton {
    width: 200px;
  }
`;
const Decisionbutton = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-around;
  > div {
    width: 200px;
    display: flex;
    justify-content: space-between;
    > cancelbuttton {
      width: 90px;
      display: flex;
      justify-content: center;
      border: solid;
    }
    > savebutton {
      width: 90px;
      display: flex;
      justify-content: center;
      border: solid;
    }
  }
  > withdrawal {
    width: 200px;
    display: flex;
    justify-content: center;
    border: solid;
  }
`;

export default function Mypage() {
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = function () {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <Navigator />
      <Backdrop>
        <Container>
          <Page onClick={handleClick}>
            <div>{/* navbar */}</div>
            <MypageBody>
              <profileimg>
                <img src="https://ww.namu.la/s/08c6a259933bf0159253cd7304180960a776791dcba49dba89d0e28648c20e544d87779113bcd874491d22a67d2cd4b9aab39683c3d27f90929872ef5b5ea10491d45a591ef332cbea92ba5ecd958221" />
              </profileimg>
              <userinfo>
                <userprofile>
                  {
                    isClicked?
                    <h1>Ian</h1>:
                    <input></input>
                  }
                  <ueremail>ian58@gmail.com</ueremail>
                </userprofile>
                <div>
                  {isClicked ? (
                    <Userbutton>
                      <modifybutton className="modifybutton" onClick={handleClick}>
                        회원정보 수정
                      </modifybutton>
                      <changepwbutton className="pwbutton">비밀번호 변경</changepwbutton>
                    </Userbutton>
                  ) : (
                    <Decisionbutton>
                      <div>
                        <cancelbuttton>취소</cancelbuttton>
                        <savebutton>저장</savebutton>
                      </div>
                      <withdrawal>회원탈퇴</withdrawal>
                    </Decisionbutton>
                  )}
                </div>
              </userinfo>
            </MypageBody>
            <div>{/* footer */}</div>
          </Page>
        </Container>
      </Backdrop>
    </div>
  );
}
