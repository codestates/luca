import { useState } from "react/cjs/react.development";
import styled from "styled-components";

const NavigatorContainer = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: white;
  text-align: center;
  align-items: center;
  display: flex;
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.1);

  > a.logo {
    margin: 0 8vh;

    > img {
      height: 5vh;
      margin: 2.5vh 0;
    }
  }
  > a.about {
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

    > div.guest {
      flex: 1 0 auto;
      font-size: 1.2em;
    }
    > div.profile {
      flex: 1 0 auto;
      height: 8vh;
      border-radius: 4vh;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      box-shadow: 1vh 1vh 1vh rgba(0, 0, 0, 0.1);

      > img.profile-image-thumb {
        height: 6vh;
        border-radius: 3vh;
        margin: 1vh;
      }
      > div.profile-username {
        margin-left: 2vh;
        font-weight: bold;
      }
      > div.profile-dropdown {
        z-index: 999;
        position: fixed;
        top: 1vh;
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

function Navigator() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownHandler = () => {
    setDropdown(!dropdown);
  };

  return (
    <NavigatorContainer>
      <a className="logo" href="/">
        <img src="Luca_logo.png" />
      </a>
      <a className="about" href="/">
        about
      </a>
      <div className="account">
        {/* <div className="guest">회원가입</div>
        <div className="guest" style={{ fontWeight: "bold" }}>
          로그인
        </div> */}
        <div className="profile">
          {!dropdown ? (
            <>
              <img
                className="profile-image-thumb"
                src="https://picsum.photos/300/300?random=1"
              />
              <div className="profile-username" onClick={dropdownHandler}>
                username
              </div>
            </>
          ) : (
            <div className="profile-dropdown">
              <div className="dropdown-index" onClick={dropdownHandler}>
                username
              </div>
              <div className="dropdown-index">
                <a href="/mypage">Mypage</a>
              </div>
              <div className="dropdown-index">Setting</div>
              <div className="dropdown-index">Logout</div>
            </div>
          )}
        </div>
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
