import { useEffect, useState } from "react";
import styled from "styled-components";
import { Savealert } from "../components/modals";
import { Navigator, Footer } from "../components/commons";
//import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  min-width: 90vw;
  min-height: 50vh;
  margin: 20vh 10vh 10vh 10vh;
  display: flex;
`;

const Section = styled.div`
  border-radius: 1vh;
  background-color: white;
`;

const Left = styled(Section)`
  min-width: 55vh;
  height: 55vh;
  margin: 0 15vh;
  background: url("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/damien-hirst-1-1538661596.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 30vh;
`;

const Right = styled(Section)`
  flex: 2 0 auto;
`;

const Upper = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  box-align: center;

  > div.name {
    font-size: 3em;
    font-weight: bold;
    > div {
      font-size: 0.75em;
    }
    > input {
      font-size: 0.75em;
      border-color: rgba(0, 0, 0, 0.5);
    }
    > input:focus {
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.1);
    }
  }
  > div.email {
    font-size: 1.5em;
    color: grey;
  }
  > div.edit {
    margin: 5vh 0;
  }
`;

const Lower = styled.div`
  font-size: 1.2em;
  font-weight: bold;

  > div {
    margin: 0.5em 0;
  }
`;

const Button = styled.button`
  font-size: 1.2em;
  font-weight: bold;
  min-height: 2em;
  min-width: 10em;
  border-radius: 1em;
  margin-right: 1em;
  border-style: none;
  background-color: white;
  color: ${(props) => (props.warn ? "red" : "rgb(80, 80, 80)")};
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.warn ? "red" : "white")};
    background-color: ${(props) => (props.warn ? "white" : "#ff7f50")};
    border: ${(props) => (props.warn ? "solid red 2px" : "none")};
  }
`;

export default function Mypage() {
  // const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.userInfo.userInfo);
  // redux-thunk 비동기 처리 필요
  // 현재 localstorage 사용해 가져옴
  const [isEditOn, setIsEditOn] = useState(false);
  const userInfo = JSON.parse(window.localStorage.userInfo);

  return (
    <div>
      <Navigator />
      <Container>
        <Left />
        {isEditOn ? (
          <Right>
            <Upper>
              <div className="name">
                <div>Display name</div>
                <input placeholder={userInfo.name} />
              </div>
              <div className="edit">
                <Button onClick={() => setIsEditOn(false)}>저장</Button>
                <Button warn={true}>회원탈퇴</Button>
              </div>
            </Upper>
            <Lower>
              <div>만든 프로젝트 2개, 참여한 프로젝트 3개</div>
              <div>만든 카드 34개, 매핑된 카드 27개</div>
            </Lower>
          </Right>
        ) : (
          <Right>
            <Upper>
              <div className="name">{userInfo.name} 님, 안녕하세요!</div>
              <div className="email">{userInfo.email}</div>
              <div className="edit">
                <Button onClick={() => setIsEditOn(true)}>프로필 수정</Button>
                <a href="/changepassword">
                  <Button>비밀번호 변경</Button>
                </a>
              </div>
            </Upper>
            <Lower>
              <div>만든 프로젝트 2개, 참여한 프로젝트 3개</div>
              <div>만든 카드 34개, 매핑된 카드 27개</div>
            </Lower>
          </Right>
        )}
      </Container>
      <Footer />
    </div>
  );
}

//<img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/damien-hirst-1-1538661596.jpg" />;

//const userInfo = useSelector((state) => state.userInfo.userInfo);
//const [isClicked, setIsClicked] = useState(false);
//const [isAlert, setIsAlert] = useState(false);

// const handleClick = function () {
//   setIsClicked(!isClicked);
// };

// const handleSave = function () {
//   setIsAlert(true);
//   setTimeout(() => {
//     setIsAlert(false);
//   }, 1500);
//   setIsClicked(false);
// };
