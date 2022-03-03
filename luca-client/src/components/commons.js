import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LoginModal } from "./modals";
import axios from "axios";
import { setIsLogin, setUserInfo } from "../redux/rootSlice.js";
import { useNavigate } from "react-router-dom";
import { color, device, contentWidth } from "../styles";
import { ExitGuestModal } from "./modals";

const NavigatorContainer = styled.div`
  z-index: 900;
  position: fixed;
  top: 0;
  width: 100vw;
  min-height: 10vh;
  background-color: white;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: space-between;
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.1);

  > a.logo {
    margin-left: 10vh;

    > img {
      height: 2em;
      margin: 2.5vh 0;
    }
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
  const [exitGuestModal, setExitGuestModal] = useState(false);
  const [modal, setModal] = useState(false);

  const modalHandler = (modalType) => {
    setModal(modalType);
  };

  const exitGuestModalHandler = () => {
    setExitGuestModal(!exitGuestModal);
  }

  const logoutHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/logout`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then(() => {
        dispatch(setIsLogin(false));
        dispatch(
          setUserInfo({
            id: "",
            email: "",
            name: "",
            isGuest: "",
            isSocial: "",
            createdAt: "",
            updatedAt: "",
          })
        );
        navigate("/");
      });
  };

  return (
    <NavigatorContainer>
      {exitGuestModal ? <ExitGuestModal exitGuestModalHandler={exitGuestModalHandler} logoutHandler={logoutHandler} /> : null}
      {modal === "login" ? <LoginModal modalHandler={modalHandler} /> : null}
      <Link to="/" className="logo">
        <img src="Luca_logo.png" />
      </Link>
      {isLogin ?
        (!userInfo.isGuest ?
          (
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
                <a className="dropdown-index" onClick={logoutHandler}>
                  <i
                    className="fa-solid fa-right-from-bracket"
                    style={{ color: "#FF5D50" }}
                  ></i>
                  <div style={{ color: "#FF5D50" }}>로그아웃</div>
                </a>
              </div>
            </div>
          ) :
          <div style={{ margin: "0 8vh" }}>
            <Guest impact onClick={() => { exitGuestModalHandler(true) }}>체험 종료</Guest>
          </div>
        ) :
        (
          <div style={{ margin: "0 8vh" }}>
            <Guest href="/signup">회원가입</Guest>
            <Guest impact onClick={() => modalHandler("login")}>
              로그인
            </Guest>
          </div>
        )
      }
    </NavigatorContainer>
  );
}

// =======================여기까지 네비게이터에 필요한 컴포넌트입니다=======================

const Backdrop = styled.div`
  min-width: 90vw;
  min-height: 100vh;
  margin: 0 2vw;
  height: auto;
  display: flex;
  justify-content: center;
  /* background-color: #efffde; */
`;

const Container = styled.div`
  min-height: 100vh;
  height: auto;
  flex: 1 0 auto;
  max-width: 1320px;
  margin: auto;
`;

// =======================================================

const FooterContainer = styled.footer`
  z-index: 999;
  width: 100vw;
  background-color: ${color.white};
  padding: 1rem;
  color: ${color.primary};
  @media ${device.laptop} {
    border-top: 1px solid ${color.primaryDark};
    padding: 2rem 0;
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr;
    width: ${contentWidth};
    margin: 0 auto;
  }
`;

const LogoSection = styled.div`
  grid-column: 1 / span 2;
  border-bottom: 1px solid ${color.primaryLight};
  img {
    padding-top: 18px;
  }
  p {
    color: ${color.primary};
    font-size: 0.85rem;
  }
  @media ${device.laptop} {
    grid-column: 1 / span 1;
    border-bottom: none;
  }
`;

const LinksContainer = styled.div`
  p {
    font-weight: bold;
    display: flex;
  }
  ul {
    display: flex;
    flex-direction: column;
    
    gap: 0.5rem;
  }
  svg {
    transition: all 0.2s ease-in-out;
    margin-left: 0.25rem;
  }
  a:hover {
    color: ${color.primaryDark};
    svg {
      margin-left: 0.5rem;
    }
  }
  @media ${device.laptop} {
    border-left: 1px solid ${color.primaryLight};
    padding-left: 1rem;
    ul {
      flex-direction: row;
      gap: 2rem;
    }
    a {
      word-break: keep-all;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <ContentContainer>
        <LogoSection>
          <img src="Luca_logo.png" height="32px" />
          <p>Copyright © 2022 Luca</p>
        </LogoSection>
        <LinksContainer>
          <p>About Luca</p>
          <ul>
            <li>
              <a href="https://github.com/codestates/luca">Repository</a>
            </li>
            <li>
              <a href="https://github.com/codestates/luca/wiki">Wiki</a>
            </li>
          </ul>
        </LinksContainer>
        <LinksContainer>
          <p>Contact</p>
          <ul>
            <li>
              <a href="https://github.com/codestates/luca">김코딩</a>
            </li>
            <li>
              <a href="https://github.com/codestates/luca">김코딩</a>
            </li>
            <li>
              <a href="https://github.com/codestates/luca">김코딩</a>
            </li>
            <li>
              <a href="https://github.com/codestates/luca">김코딩</a>
            </li>
          </ul>
        </LinksContainer>
      </ContentContainer>
    </FooterContainer>
  );
}

export { Navigator, Backdrop, Container, Footer };
