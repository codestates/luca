import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/rootSlice.js";
import { device } from "../styles";
import styled from "styled-components";
import { Navigator, Footer } from "../components/commons";
import axios from "axios";

const Container = styled.div`
  grid-column: 1 / span 2;
  @media ${device.laptop} {
    min-width: 90vw;
  min-height: 50vh;
  margin: 20vh 10vh 10vh 10vh;
  display: flex;
  position: relative;
}
`;

const Section = styled.div`
  border-radius: 1vh;
  background-color: white;
`;

const Left = styled(Section)`
    min-width: 35vh;
    height: 35vh;
    margin: 20vh 15vh 0;
    background: url("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/damien-hirst-1-1538661596.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 30vh;
  @media ${device.laptop} {
    min-width: 55vh;
    height: 55vh;
    margin: 0 15vh;
  > i {
    position: relative;
    top: 50vh;
    left: 50vh;
    font-size: 3vh;
    color: silver;
    }
  > i:hover {
    color: gray;
    }
  > i:active {
    color: orange;
    }
  }
`;

const Right = styled(Section)`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-left: 3rem;
  @media ${device.laptop} {
    flex: 2 0 auto;
    margin: 0;
  }
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
    padding: 0.5em;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isEditOn, setIsEditOn] = useState(false);
  const editnameRef = useRef();

  const handlerEditname = () => {
    let newName = editnameRef.current.value;
    if (newName !== "") {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/profile/name`,
          { name: newName },
          {
            "Content-Type": "application/json",
            withCredentials: true,
          }
        )
        .then((res) => {
          dispatch(setUserInfo({ ...userInfo, name: newName }));
          setIsEditOn(false);
        })
        .catch((err) => {
          alert("error");
        });
    }else{
      setIsEditOn(false)
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
    .then((res) => {
      dispatch(setUserInfo(res.data.data));
    })
    .catch((err) => {
      navigate("/");
    });
  }, []);

  return (
    <div>
      <Navigator />
      <Container>
        <Left>
        </Left>
        {isEditOn ? (
          <Right>
            <Upper>
              <div className="name">
                <div>Display name</div>
                <input placeholder={userInfo.name} ref={editnameRef} />
              </div>
              <div className="edit">
                <Button onClick={handlerEditname}>저장</Button>
                <Button warn={true}>회원탈퇴</Button>
              </div>
            </Upper>
            <Lower>
              <div>{`만든 프로젝트 ${userInfo.countAdminProject}개`}</div>
              <div>{`참여한 프로젝트 ${userInfo.countJoinProject}개`}</div>
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
              <div>{`만든 프로젝트 ${userInfo.countAdminProject}개`}</div>
              <div>{`참여한 프로젝트 ${userInfo.countJoinProject}개`}</div>
            </Lower>
          </Right>
        )}
      </Container>
      <Footer />
    </div>
  );
}
