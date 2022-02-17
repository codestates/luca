import { useState } from "react";
import styled from "styled-components";
import { Savealert } from "../components/modals";
import { Navigator, Backdrop, Container } from "../components/commons";

const Page = styled.div`
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  background-color: seashell;
`;
const MypageBody = styled.div`
  position: relative;
  background-color: seashell;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1300px;
  height: 70vh;
  > userinfo {
    > userprofile {
      display: flex;
      flex-direction: column;
      align-items: center;
      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80px;
        > h1 {
          /* height: 25px; */
        }
        > input {
          width: 100%;
          height: 30px;
          /* margin-bottom: 10px;
          margin-top: 10px; */
        }
      }
      > useremail {
        font-size: 1.2rem;
      }
    }
    > div {
      margin-top: 20px;
      width: 420px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  > profileimg {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    overflow: hidden;
    > img {
      max-width: 100%;
      height: 100%;
      width: 100%;
    }
  }
`;
const Userbutton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
  > * {
    width: 200px;
    font-size: 20px;
    text-align: center;
    border-radius: 20px;
    border: solid gray;
  }
  > *:hover {
    /* box-shadow: 0px 0px 10px black; */
    background-color: gray;
  }
  > *:active {
    color: silver;
  }
`;
const Decisionbutton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
  > div {
    width: 200px;
    display: flex;
    justify-content: space-between;
    > * {
      width: 90px;
      display: flex;
      justify-content: center;
      border: solid;
      font-size: 20px;
    }
    > * {
      border-radius: 20px;
      border: solid gray;
    }
    > *:hover {
      background-color: gray;
    }
    > *:active {
      color: silver;
    }
  }
  > withdrawal {
    width: 196px;
    font-size: 20px;
    /* display: flex; */
    text-align: center;
    justify-content: center;
    border: solid;
    border-radius: 20px;
    border: solid gray;
  }
  > withdrawal:hover {
    background-color: gray;
  }
  > withdrawal:active {
    color: silver;
  }
`;

export default function Mypage() {
  const [isClicked, setIsClicked] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const handleClick = function () {
    setIsClicked(!isClicked);
  };

  const handleSave = function () {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 1500);
    setIsClicked(false);
  };

  return (
    <div>
      <Navigator />
      <Backdrop>
        <Container>
          <Page>
            <div>{/* navbar */}</div>
            <MypageBody>
              {isAlert ? <Savealert /> : null}
              <profileimg>
                <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/damien-hirst-1-1538661596.jpg" />
              </profileimg>
              <userinfo>
                <userprofile>
                  {isClicked ? (
                    <div>
                      <input></input>
                    </div>
                  ) : (
                    <div>
                      <h1>Ian</h1>
                    </div>
                  )}
                  <useremail>ian58@gmail.com</useremail>
                </userprofile>
                <div>
                  {isClicked ? (
                    <Decisionbutton>
                      <div>
                        <cancelbuttton onClick={handleClick}>
                          취소
                        </cancelbuttton>
                        <savebutton onClick={handleSave}>저장</savebutton>
                      </div>
                      <withdrawal>회원탈퇴</withdrawal>
                    </Decisionbutton>
                  ) : (
                    <Userbutton>
                      <modifybutton
                        className="modifybutton"
                        onClick={handleClick}
                      >
                        회원정보 수정
                      </modifybutton>
                      <changepwbutton className="pwbutton">
                        비밀번호 변경
                      </changepwbutton>
                    </Userbutton>
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
