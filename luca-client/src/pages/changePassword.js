import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navigator, Backdrop } from "../components/commons";

export default function ChangePassword() {
  const Container = styled.div`
    position: relative;
    height: 70vh;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const ChangePW = styled.div`
    /* border: solid; */
    /* margin-top: 10vh; */

    /* height: 70vh; */
    /* margin-top: 10vh; */
    display: flex;
    flex-direction: column;
    align-items: center;
    > registrybox {
      border: solid gray;
      border-radius: 20px;
      width: 640px;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      box-shadow: darkgray 0px 0px 10px;
      > new {
        /* display: flex;
        flex-direction: column; */
      }
      > confirm {
        /* display: flex;
        flex-direction: column; */
      }
      > * {
        /* border: solid; */
        border-color: red;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        align-items: center;
        margin-top: 70px;
        > box {
          display: flex;
          flex-direction: row;
          align-items: center;
          > input {
            margin-right: 110px;
            width: 310px;
            height: 30px;
            font-size: 20px;
            border-radius: 10px;
            border: solid 2px darkorange;
          }
          > div {
            margin-right: 20px;
            font-size: 1.2rem;
          }
        }
        > curAlert {
          display: flex;
          justify-content: end;
          width: 300px;
          position: absolute;
          left: 35%;
          top: 35.5%;
          color: red;
        }
        > newalert {
          display: flex;
          justify-content: end;
          width: 300px;
          position: absolute;
          left: 35%;
          top: 51%;
          color: red;
        }
        > checkalert {
          display: flex;
          justify-content: end;
          width: 300px;
          position: absolute;
          left: 35%;
          top: 66%;
          color: red;
        }
      }
      > buttons {
        width: 100%;
        display: flex;
        justify-content: center;
        > div {
          margin-right: 50px;
          margin-left: 50px;
          width: 90px;
          /* border: solid gray; */
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 70px;
          border-radius: 20px;
          box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.2);
        }
        > div:hover {
          background-color: orange;
          color: white;
        }
        > div:active {
          color: silver;
        }
      }
    }
  `;

  const navigate = useNavigate();
  const curPwRef = useRef();
  const newPwRef = useRef();
  const newPwCheckRef = useRef();

  const [userPw, setUserPw] = useState({});
  const [curPwAlert, setCurPwAlert] = useState("");
  const [newPwAlert, setNewPwAlert] = useState("");
  const [newPwCheckAlert, setNewPwCheckAlert] = useState("");

  const changePw = () => {};
  const checkCurPw = () => {};

  const newPw = () => {
    console.log("running");
    const pw = newPwRef.current.value;

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A -Za-z\d!@#$%^&*?]{8,}$/;
    if (!passwordRegex.test(pw)) {
      setNewPwAlert(
        "비밀번호는 특수문자와 숫자를 포함해 8글자 이상이어야 합니다."
      );
    } else {
      setNewPwAlert("");
    }
  };

  const checkNewPw = () => {
    const pwCheck = newPwCheckRef.current.value;
    if (pwCheck === newPwRef.current.value) {
      setNewPwCheckAlert("");
    } else {
      setNewPwCheckAlert("비밀번호가 일치하지 않습니다.");
    }
  };

  const CancleHandler = () => {
    // navigator("/mypage")
    navigate("/mypage");
  };

  return (
    <div>
      <Navigator />
      <Backdrop>
        <Container>
          <ChangePW>
            <h2>비밀번호 변경</h2>
            <registrybox>
              <current>
                <box>
                  <div>현재 비밀번호</div>
                  <input
                    ref={curPwRef}
                    type="text"
                    placeholder="현재 비밀번호를 입력하세요."
                  />
                </box>
                {curPwAlert ? <curalert>{curPwAlert}</curalert> : null}
              </current>
              <new>
                <box>
                  <div>새 비밀번호</div>
                  <input
                    ref={newPwRef}
                    type="text"
                    placeholder="새 비밀번호를 입력하세요."
                  ></input>
                </box>
                {newPwAlert ? <newalert>{newPwAlert}</newalert> : null}
              </new>
              <confirm>
                <box>
                  <div>비밀번호 확인</div>
                  <input
                    ref={newPwCheckRef}
                    type="text"
                    placeholder="비밀번호를 확인하세요."
                    onChange={checkNewPw}
                  />
                </box>
                {newPwCheckAlert ? (
                  <checkalert>{newPwCheckAlert}</checkalert>
                ) : null}
              </confirm>
              <buttons>
                <div onClick={CancleHandler}>취소</div>
                <div
                  onClick={() => {
                    checkCurPw();
                    newPw();
                    checkNewPw();
                    // navigate("/mypage");
                  }}
                >
                  저장
                </div>
              </buttons>
            </registrybox>
          </ChangePW>
        </Container>
      </Backdrop>
    </div>
  );
}
