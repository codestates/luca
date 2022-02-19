import { useState } from "react/cjs/react.development";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../redux/slicer/loginSlice";
import styled from "styled-components";
import { LoginModal } from "./modals";
import axios from "axios";
import {checkLogin, getUserInfo} from "../redux/counterslice.js";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../redux/slicer/userInfoSlice";

const NavigatorContainer = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  width: 100vw;
  min-height: 10vh;
  background-color: white;
  text-align: center;
  align-items: center;
  display: flex;
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.3);

  > a.logo {
    margin: 0 8vh;

    > img {
      height: 2em;
      margin: 2.5vh 0;
    }
  }
  > div.about {
    font-family: "Poppins", sans-serif;
    flex: 2 0 auto;
    font-size: 1.4em;
    text-align: left;
    margin: 1em;
  }
  > div.account {
    width: 12em;
    display: flex;
    align-items: center;
    margin-right: 8vh;

    /* > div.guest {
      flex: 1 0 auto;
      background-color: ${(props) =>
      props.impact ? "white" : "rgb(255, 127, 80)"};
      color: ${(props) => (props.impact ? "black" : "white")};
      border: solid black 1px;
      margin: 0.5em;
      padding: 0.6em;
      border-radius: 2em;
      cursor: pointer;
    } */
    > div.profile {
      flex: 1 0 auto;
      height: 8vh;
      border-radius: 4vh;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      box-shadow: 0vh 0vh 2vh rgba(0, 0, 0, 0.2);

      > img.profile-image-thumb {
        height: 6vh;
        border-radius: 3vh;
        margin: 1vh;
      }
      > div.profile-username {
        margin-left: 2vh;
        font-weight: bold;
        cursor: pointer;
      }
      > div.profile-username:hover {
        color: blue;
      }
      > div.profile-dropdown {
        z-index: 999;
        position: fixed;
        top: 5vh;
        width: 10em;
        height: 8em;
        border-radius: 4vh;
        background-color: white;
        box-shadow: 0vh 0vh 2vh rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        > div.dropdown-index {
          flex: 1 0 auto;
          margin: 0.25em;
        }
      }
    }
  }
`;
const Guest = styled.a`
  flex: 1 0 auto;
  background-color: ${(props) =>
    props.impact ? "rgb(255, 127, 80)" : "white"};
  color: ${(props) => (props.impact ? "white" : "black")};
  font-weight: bold;
  margin: 0.5em;
  padding: 0.6em;
  border-radius: 2em;
  cursor: pointer;
`;

function Navigator() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);

  const [modal, setModal] = useState(false);

  const modalHandler = (modalType) => {
    setModal(modalType);
  };

  const logoutHandler = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/logout`, {
      'Content-Type': 'application/json', 
      withCredentials: true 
    })
    .then(() => {
      dispatch(setIsLogin(false));
      dispatch(setUserInfo(null));
      navigate("/")
    });
    // logout 요청시 토큰이 없기때문에 (현재 localstorage로 로그인 유지 구현) 401 에러 뜸

    // window.localStorage.clear();
    // window.location.replace("/");
  };

  return (
    <NavigatorContainer>
      {modal === "login" ? <LoginModal modalHandler={modalHandler} /> : null}
      {/* 로그인 모달을 닫기 위한 조건문입니다.(flowervillagearp) */}
      <a className="logo" href="/">
        <img src="Luca_logo.png" />
      </a>
      <div className="about">
        <a href="/">about</a>
      </div>
      <div>
        {isLogin ? (
          <div className="profile">
            <img
              className="profile"
              src="https://picsum.photos/300/300?random=1"
            />
            <div className="dropdown">
              <div className="username">-username-</div>
              <a className="dropdown-index" href="/mypage">
                <i className="fa-solid fa-user"></i>
                <div>마이페이지</div>
              </a>
              <a className="dropdown-index" href="/mypage">
                <i className="fa-solid fa-gear"></i>
                <div>설정</div>
              </a>
              <a className="dropdown-index" onClick={logoutHandler}>
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ color: "#FF5D50" }}
                ></i>
                <div style={{ color: "#FF5D50" }}>로그아웃</div>
              </a>
            </div>
          </div>
        ) : (
          <>
            <Guest className="guest" href="/signup">
              회원가입
            </Guest>
            <Guest
              className="guest"
              onClick={() => modalHandler("login")}
              impact
            >
              로그인
            </Guest>
          </>
        )}
      </div>
    </NavigatorContainer>
  );
}

// =======================여기까지 네비게이터에 필요한 컴포넌트입니다=======================

const Backdrop = styled.div`
  min-width: 90vw;
  min-height: 90vh;
  margin: 0 5vw;
  height: auto;
  display: flex;
  justify-content: center;
  background-color: grey;
`;

// const Container = styled.div`
//   min-height: 90vh;
//   height: auto;
//   flex: 1 0 auto;
//   max-width: 1320px;
//   margin: auto;
// `;

const FooterContainer = styled.div`
  bottom: 0;
  width: 100vw;
  min-height: 20vh;
  background-color: rgb(70, 70, 70);
  align-items: center;
  display: flex;
`;

function Footer() {
  return <FooterContainer>this is footer</FooterContainer>;
}

export { Navigator, Backdrop, Footer };
