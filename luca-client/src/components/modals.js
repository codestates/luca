import styled from "styled-components";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin, setUserInfo, setProjectList } from "../redux/rootSlice";
import axios from "axios";
import googleIcon from "../asset/images/login_icon_google.svg";
import kakaoIcon from "../asset/images/login_icon_kakao.svg";
import naverIcon from "../asset/images/login_icon_naver.svg";
import { color, device, radius } from "../styles";
import {
  requestKakaoLogin,
  requestNaverLogin,
  requestGoogleLogin,
} from "../api";

const ModalBackdrop = styled.div`
  z-index: 950;
  width: 100vw;
  top: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalView = styled.div`
  z-index: 950;
  flex: 1 0 auto;
  max-width: 600px;
  margin: auto;
  padding: 3em;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  > div.modal-title {
    flex: 1 0 auto;
    margin-bottom: 1em;
    font-size: 2em;
    font-weight: bold;
  }
  > div.modal-body {
    flex: 4 0 auto;
    > div.query {
      display: flex;
      margin: 1.5em 0;
      > div.index {
        flex: 1 0 auto;
        text-align: right;
        font-size: 1.2em;
      }
      > input {
        width: 100%;
        height: 40px;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid ${color.primaryBorder};
        border-radius: ${radius};
      }

      > input:focus {
        border-color: rgba(0, 0, 0, 0.5);
      }

      > div.searchContainer {
        flex: 1 0 auto;
        display: flex;
        flex-direction: row;

        > input {
          width: 100%;
          height: 40px;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid ${color.primaryBorder};
          border-radius: ${radius};
        }

        > input:focus {
          border-color: rgba(0, 0, 0, 0.5);
        }

        > button {
          min-width: 58px;
          margin-left: 1rem;
          border: 1px solid ${color.primaryBorder};
          border-radius: ${radius};
        }
      }

      button.private {
        flex: 1 0 auto;
        font-size: 1.2em;
        margin: 0.5em;
        border-radius: 10px;
        background-color: ${(props) =>
          props.isTeam ? "none" : `${color.primaryLight};`};
        cursor: pointer;
      }

      button.team {
        flex: 1 0 auto;
        font-size: 1.2em;
        margin: 0.5em;
        border-radius: 10px;
        background-color: ${(props) =>
          props.isTeam ? `${color.primaryLight};` : "none"};
        cursor: pointer;
      }

      button.block {
        flex: 1 0 auto;
        font-size: 1.2em;
        margin: 0.5em;
        border-radius: 10px;
        background-color: grey;
        cursor: not-allowed;
      }

      button.options:visited {
        color: blue;
        border-radius: 10px;
      }
    }
  }
  div.memberContainer {
    border: 1px solid ${color.primaryBorder};
    border-radius: ${radius};
    padding: 1rem 0 1rem 0;

    > div {
      font-size: 1.2em;
    }
  }
  > span {
    margin-right: 1em;
    color: rgba(0, 0, 0, 0.5);
  }
  > div.modal-footer {
    flex: 1 0 auto;
    margin-top: 1em;

    > div.buttons {
      display: flex;
      margin: 0 2em;
      > button {
        flex: 1 0 auto;
        padding: 1em;
        margin: 1em;
        border-radius: 1em;
        border: solid grey 1px;
        font-size: 1.2em;
      }
      > button.confirm {
        font-weight: bold;
        border: solid grey 1px;
        background-color: ${color.primaryLight};
        cursor: pointer;
      }
    }
    img {
      width: 60px;
      height: 60px;
      margin: 0.5rem;
      border-radius: 50%;
      align-items: center;
      cursor: pointer;
    }
  }
`;

const LoginModalView = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  padding: 3em 1.5em 3em 3em;
  background-color: white;
  border-radius: 1em;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  align-items: center;

  > div {
    flex: 1 0 auto;
    width: 400px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    text-align: center;

    > div.modal-title {
      flex: 1 0 auto;
      margin-bottom: 1em;
      font-size: 2em;
      font-weight: bold;
    }

    > div.modal-body {
      flex: 4 0 auto;

      > div.query {
        display: flex;
        margin: 1.5em 0;
        > div.index {
          flex: 1 0 auto;
          text-align: right;
          font-size: 1.2em;
        }
        > input {
          width: 100%;
          height: 40px;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid ${color.primaryBorder};
          border-radius: ${radius};
        }

        > input:focus {
          border-color: rgba(0, 0, 0, 0.5);
        }

        > div.searchContainer {
          flex: 1 0 auto;
          display: flex;
          flex-direction: row;

          > input {
            width: 100%;
            height: 40px;
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid ${color.primaryBorder};
            border-radius: ${radius};
          }

          > input:focus {
            border-color: rgba(0, 0, 0, 0.5);
          }

          > button {
            min-width: 58px;
            margin-left: 1rem;
            border: 1px solid ${color.primaryBorder};
            border-radius: ${radius};
          }
        }

        button.private {
          flex: 1 0 auto;
          font-size: 1.2em;
          margin: 0.5em;
          border-radius: 10px;
          background-color: ${(props) =>
            props.isTeam ? "none" : `${color.primaryLight};`};
          cursor: pointer;
        }

        button.team {
          flex: 1 0 auto;
          font-size: 1.2em;
          margin: 0.5em;
          border-radius: 10px;
          background-color: ${(props) =>
            props.isTeam ? `${color.primaryLight};` : "none"};
          cursor: pointer;
        }

        button.block {
          flex: 1 0 auto;
          font-size: 1.2em;
          margin: 0.5em;
          border-radius: 10px;
          background-color: grey;
          cursor: not-allowed;
        }

        button.options:visited {
          color: blue;
          border-radius: 10px;
        }
      }

      div.memberContainer {
        border: 1px solid ${color.primaryBorder};
        border-radius: ${radius};
        padding: 1rem 0 1rem 0;

        > div {
          font-size: 1.2em;
        }
      }

      > span {
        margin-right: 1em;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    > div.modal-footer {
      flex: 1 0 auto;
      margin-top: 1em;

      > div.buttons {
        display: flex;
        margin: 0 2em;
        > button {
          flex: 1 0 auto;
          padding: 1em;
          margin: 1em;
          border-radius: 1em;
          font-size: 1.2em;
        }
        > button.confirm {
          font-weight: bold;
          border: none;
          border-radius: 3em;
          background-color: ${color.primaryLight};
          cursor: pointer;
        }
      }
      img {
        width: 60px;
        height: 60px;
        margin: 0.5rem;
        border-radius: 50%;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  > img {
    width: 0;
    @media ${device.laptop} {
      width: 500px;
    }
  }
`;

export function LoginModal({ modalHandler }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputValue = (e, key) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState("");

  const LoginHandler = () => {
    if (loginInfo.email.length === 0 || loginInfo.password.length === 0) {
      return setErrorMessage("이메일과 비밀번호를 입력해주세요");
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, loginInfo, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setIsLogin(true));
          dispatch(setUserInfo(res.data.data));
          modalHandler(false);
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          return setErrorMessage("잘못된 이메일 혹은 비밀번호입니다.");
        }
      });
  };

  return (
    <ModalBackdrop onClick={() => modalHandler(false)}>
      <LoginModalView onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="modal-title">로그인</div>
          <div className="modal-body">
            <div className="query">
              <input
                onChange={(e) => handleInputValue(e, "email")}
                placeholder="이메일"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    return LoginHandler();
                  }
                }}
              />
            </div>
            <div className="query">
              <input
                onChange={(e) => handleInputValue(e, "password")}
                placeholder="비밀번호"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    return LoginHandler();
                  }
                }}
                type="password"
              />
            </div>
            <div style={{ color: "red" }}>{errorMessage}</div>
            <span>계정이 없으신가요?</span>
            <a href="/signup">
              <span>회원가입</span>
            </a>
          </div>
          <div className="modal-footer">
            <div className="buttons">
              <button className="confirm" onClick={LoginHandler}>
                로그인
              </button>
            </div>
            <div>
              <img
                src={kakaoIcon}
                alt="카카오 아이콘"
                onClick={requestKakaoLogin}
              ></img>
              <img
                src={googleIcon}
                alt="카카오 아이콘"
                onClick={requestGoogleLogin}
              ></img>
              <img
                src={naverIcon}
                alt="카카오 아이콘"
                onClick={requestNaverLogin}
              ></img>
            </div>
          </div>
        </div>
        <img src="loginimage.webp" />
      </LoginModalView>
    </ModalBackdrop>
  );
}

const Pilot = styled.div`
  display: ${(props) => (props.pilotOn ? "block" : "none")};
  position: fixed;
  z-index: 999;
  left: ${(props) => props.x - 150 + "px"};
  top: ${(props) => props.y + 10 + "px"};
  width: auto;
  height: 20px;
  padding: 6px 10px;
  border-radius: 16px;
  background-color: grey;
  color: white;
  border: black solid 1px;
  font-weight: bold;
`;

export function CreateProjectModal({ modalHandler }) {
  const nameRef = useRef();
  const descRef = useRef();
  const inviteRef = useRef();
  const keywordRef = useRef();
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const [isTeam, setIsTeam] = useState(false);
  const [memberId, setMemberId] = useState([]);
  const [memberEmail, setMemberEmail] = useState([]);
  const [pilotOn, setPilotOn] = useState(false);
  const [pilotCoord, setPilotCoord] = useState([0, 0]);

  const pilotHandler = (e) => {
    setPilotCoord([e.clientX, e.clientY]);
    setPilotOn(!pilotOn);
  };

  const handleTeam = (e) => {
    setMemberId([]);
    setMemberEmail([]);
    setIsTeam(e);
    console.log(isTeam);
  };

  const findMemberHandler = async () => {
    if (inviteRef.current.value === "") {
      alert("내용을 입력해 주세요");
    } else if (inviteRef.current.value === userInfo.email) {
      alert("본인입니다");
    } else {
      const result = await axios
        .post(
          `${process.env.REACT_APP_API_URL}/project/member`,
          {
            email: inviteRef.current.value,
          },
          {
            "Content-Type": "application/json",
            withCredentials: true,
          }
        )
        .catch((err) => {
          console.log(err);
        });
      if (result.data.message === "Found user") {
        if (memberEmail.includes(result.data.data.email)) {
          alert("이미 추가된 회원입니다");
        } else {
          setMemberId([...memberId, result.data.data.id]);
          setMemberEmail([...memberEmail, result.data.data.email]);
          inviteRef.current.value = "";
        }
      } else if (result.data.message === "Not found user") {
        alert("존재하지 않는 유저입니다");
      }
    }
  };

  const createNewProject = () => {
    if (
      nameRef.current.value === "" ||
      descRef.current.value === "" ||
      keywordRef.current.value === ""
    ) {
      alert("내용을 채워주세요");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/project`,
          {
            userId: userInfo.id,
            title: nameRef.current.value,
            desc: descRef.current.value,
            keyword: keywordRef.current.value,
            isTeam: isTeam,
            memberUserId: [userInfo.id, ...memberId],
          },
          {
            "Content-Type": "application/json",
            withCredentials: true,
          }
        )
        .then(() => {
          axios
            .get(`${process.env.REACT_APP_API_URL}/project`, {
              "Content-Type": "application/json",
              withCredentials: true,
            })
            .then((res) => {
              dispatch(setProjectList(res.data.data));
            });
        })
        .catch((err) => {
          if (err.response.status === 422) {
            alert("내용을 채워주세요");
          }
        });
      modalHandler(false);
    }
  };

  return (
    <>
      <Pilot pilotOn={pilotOn} x={pilotCoord[0]} y={pilotCoord[1]}>
        팀 프로젝트는 로그인 후 사용하실 수 있습니다
      </Pilot>
      <ModalBackdrop onClick={() => modalHandler(false)}>
        <ModalView onClick={(e) => e.stopPropagation()} isTeam={isTeam}>
          <div className="modal-title">새 프로젝트</div>
          <div className="modal-body">
            <div className="query">
              <button
                className="private"
                onClick={() => {
                  handleTeam(false);
                }}
              >
                개인
              </button>
              {!userInfo.isGuest ? (
                <button
                  className="team"
                  onClick={() => {
                    handleTeam(true);
                  }}
                >
                  팀
                </button>
              ) : (
                <>
                  <button
                    className="block"
                    onMouseEnter={pilotHandler}
                    onMouseLeave={pilotHandler}
                  >
                    팀
                  </button>
                </>
              )}
            </div>
            <div className="query">
              <input ref={nameRef} placeholder="이름" />
            </div>
            <div className="query">
              <input ref={descRef} placeholder="설명" />
            </div>
            <div className="query">
              <input ref={keywordRef} placeholder="키워드" />
            </div>
            {isTeam ? (
              <div className="query">
                <div className="searchContainer">
                  <input ref={inviteRef} placeholder="초대 이메일" />
                  <button onClick={findMemberHandler}>추가</button>
                </div>
              </div>
            ) : null}
            {isTeam && memberEmail.length > 0 ? (
              <div className="memberContainer">
                {memberEmail.map((el, i) => {
                  return <div key={i}>{el}</div>;
                })}
              </div>
            ) : null}
          </div>
          <div className="modal-footer">
            <div className="buttons">
              <button onClick={modalHandler}>취소</button>
              <button
                className="confirm"
                onClick={() => {
                  createNewProject();
                }}
              >
                생성
              </button>
            </div>
          </div>
        </ModalView>
      </ModalBackdrop>
    </>
  );
}

export function DeleteProjectModal({ modalHandler, deleteProjectHandler }) {
  return (
    <ModalBackdrop onClick={() => modalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">프로젝트 #12 를 삭제하시겠습니까?</div>
        <div>삭제한 프로젝트는 복구할 수 없습니다</div>
        <div className="modal-footer">
          <div className="buttons">
            <button onClick={() => modalHandler(false)}>취소</button>
            <button
              className="confirm"
              onClick={() => {
                deleteProjectHandler();
                modalHandler(false);
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

const SortModalBody = styled.div`
  width: 150px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid red;
  position: absolute;
  top: 5%;
  right: 0%;
  height: 60px;
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  > div:hover {
    background-color: red;
  }
`;

export function Sortmodal({ sortHandler }) {
  return (
    <SortModalBody>
      <div
        onClick={() => {
          sortHandler("update");
        }}
      >
        업데이트일 기준 정렬
      </div>
      <div
        onClick={() => {
          sortHandler("create");
        }}
      >
        생성일 기준 정렬
      </div>
    </SortModalBody>
  );
}

const SaveAlertbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 50px;
  border: solid gray;
  position: absolute;
  background-color: gray;
  border-radius: 30px;
  top: 2%;
  font-size: 1.4rem;
  color: darkgray;
`;

export function Savealert() {
  return (
    <SaveAlertbox>
      <div>저장되었습니다</div>
    </SaveAlertbox>
  );
}

export function WithdrawalConfirm({ withdrawalModalHandler }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWithdrawal = (el) => {
    if (el === "confirm") {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/profile`)
        .then(() => {
          dispatch(setIsLogin(false));
          dispatch(setUserInfo({}));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (el === "cancel") {
      withdrawalModalHandler(false);
    }
  };

  return (
    <ModalBackdrop onClick={() => withdrawalModalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">회원 탈퇴를 진행하시겠습니까?</div>
        <div>모든 프로젝트가 삭제되며 복구할 수 없습니다</div>
        <div className="modal-footer">
          <div className="buttons">
            <button
              onClick={() => {
                handleWithdrawal("cancel");
              }}
            >
              취소
            </button>
            <button
              className="confirm"
              onClick={() => {
                handleWithdrawal("confirm");
              }}
            >
              확인
            </button>
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

export function ExitGuestModal({ exitGuestModalHandler, logoutHandler }) {
  return (
    <ModalBackdrop onClick={() => exitGuestModalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">체험을 종료하시겠습니까?</div>
        <div>모든 프로젝트가 삭제되며 복구할 수 없습니다</div>
        <div className="modal-footer">
          <div className="buttons">
            <button onClick={() => exitGuestModalHandler(false)}>취소</button>
            <button className="confirm" onClick={logoutHandler}>
              확인
            </button>
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}
