import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LoginModal } from "./modals";
import axios from "axios";
import { setIsLogin, setUserInfo } from "../redux/rootSlice.js";
import { useNavigate } from "react-router-dom";

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
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.1);

  > a.logo {
    margin: 0 10vh;

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

  > div.profile {
    margin-right: 10vh;
    padding: 2vh 0;
    > img {
      height: 6vh;
      border-radius: 3vh;
      cursor: pointer;
    }
    > div.dropdown {
      display: none;
    }
  }
  > div.profile:hover {
    > div.dropdown {
      position: fixed;
      top: 9.5vh;
      right: 9vh;
      border-radius: 1vh;
      overflow: hidden;
      background-color: white;
      box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      > div.username {
        flex: 1 0 auto;
        padding: 0.5em 0;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.7);
      }
      > a.dropdown-index {
        flex: 1 0 auto;
        width: 15vh;
        padding: 0.7em;
        text-align: left;
        cursor: pointer;
        display: flex;
        > i {
          size: 1em;
          margin-right: 0.8em;
          color: rgba(0, 0, 0, 0.3);
        }
        > div {
          color: grey;
        }
      }
      > a.dropdown-index:hover {
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

const Guest = styled.a`
  background-color: ${(props) =>
    props.impact ? "rgb(255, 127, 80)" : "white"};
  color: ${(props) => (props.impact ? "white" : "rgba(0,0,0,0.7)")};
  padding: 0.8em;
  border-radius: 2em;
  cursor: pointer;
`;

function Navigator() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const userInfo = useSelector((state) => state.user.userInfo);

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
        dispatch(setUserInfo({
          id: "",
          email: "",
          name: "",
          isGuest: "",
          isSocial: "",
          createdAt: "",
          updatedAt: ""
        }));
        navigate("/")
      });
  };

  return (
    <NavigatorContainer>
      {modal === "login" ? <LoginModal modalHandler={modalHandler} /> : null}
      <Link to="/" className="logo">
        <img src="Luca_logo.png" />
      </Link>
      <div className="about">
        <Link to="/">about</Link>
      </div>
      {isLogin ? (
        <div className="profile">
          <img
            className="profile"
            src="https://picsum.photos/300/300?random=1"
          />
          <div className="dropdown">
            <div className="username">{userInfo.name}</div>
            <Link to="/mypage" className="dropdown-index">
              <i className="fa-solid fa-user"></i>
              <div>마이페이지</div>
            </Link>
            <Link to="/mypage" className="dropdown-index">
              <i className="fa-solid fa-gear"></i>
              <div>설정</div>
            </Link>
            <div className="dropdown-index" onClick={logoutHandler}>
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ color: "#FF5D50" }}
              ></i>
              <div style={{ color: "#FF5D50" }}>로그아웃</div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ margin: "0 8vh" }}>
          <Guest href="/signup">회원가입</Guest>
          <Guest impact onClick={() => modalHandler("login")}>
            로그인
          </Guest>
        </div>
      )}
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
  background-color: #efffde;
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
