import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { LoginModal } from "./modals";

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

function Navigator({ isLogin }) {
  const [dropdown, setDropdown] = useState(false);
  const [isClicked, setIsClicked] = useState(false); //로그인 모달 띄우기 위한 생태입니다.(flowervillagearp)
  // onClick이벤트 => onMouseOver 로 드롭다운 방법 변경, 구현 중

  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  const onClickHandler = () => { //로그인 모달 띄우기 위한 생태 변경 함수입니다.(flowervillagearp)
    setIsClicked(!isClicked);
  }

  return (
    <NavigatorContainer onClick={isClicked? onClickHandler: null}> {/* 로그인 모달을 닫기 위한 조건문입니다.(flowervillagearp) */}
      <a className="logo" href="/">
        <img src="Luca_logo.png" />
      </a>
      <div className="about">
        <a href="/">about</a>
      </div>
      <div className="account">
        {isLogin ? (
          <div className="profile">
            {!dropdown ? (
              <>
                <img
                  className="profile-image-thumb"
                  src="https://picsum.photos/300/300?random=1"
                />
                <div className="profile-username" onMouseOver={dropdownHandler}>
                  Username
                </div>
              </>
            ) : (
              <div className="profile-dropdown">
                <div className="dropdown-index" onClick={dropdownHandler}>
                  Username
                </div>
                <div className="dropdown-index">
                  <a href="/mypage">Mypage</a>
                </div>
                <div className="dropdown-index">Setting</div>
                <div className="dropdown-index">Logout</div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Guest className="guest" href="/signup">
              회원가입
            </Guest>
            <Guest className="guest" impact onClick={onClickHandler}>
              로그인
            </Guest>
            {
              isClicked ?
              <LoginModal />:
              null
            }
          </>
        )}
      </div>
    </NavigatorContainer>
  );
}

// =======================여기까지 네비게이터에 필요한 컴포넌트입니다=======================

const Backdrop = styled.div`
  width: 100vw;
  min-height: 90vh;
  height: auto;
  justify-content: center;
  display: flex;
`;

const Container = styled.div`
  min-height: 90vh;
  height: auto;
  flex: 1 0 auto;
  max-width: 1320px;
  margin: auto;
`;

export { Navigator, Backdrop, Container };
