import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
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
        > div {
          margin-right: 110px;
          width: 90px;
          border: solid gray;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 70px;
          border-radius: 20px;
        }
        > div:hover {
          background-color: gray;
        }
        > div:active {
          color: silver;
        }
      }
    }
  `;

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
    console.log(pw);
    let symbol = pw.search(/[~!@#$%^&*()_+|<>?:{}]/g);
    console.log(symbol);
    if (pw.length < 8) {
      setNewPwAlert("비밀번호는 8자 이상입니다.");
    } else if (symbol < 0) {
      setNewPwAlert("비밀번호는 특수문자를 포함해야 합니다.");
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
                  <div>현재 비밀변호</div>
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
                  />
                </box>
                {newPwCheckAlert ? (
                  <checkalert>{newPwCheckAlert}</checkalert>
                ) : null}
              </confirm>
              <buttons>
                <div>취소</div>
                <div
                  onClick={() => {
                    checkCurPw();
                    newPw();
                    checkNewPw();
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
