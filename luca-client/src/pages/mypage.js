import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Savealert } from "../components/modals";
import { Navigator, Backdrop } from "../components/commons";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin, setUserInfo } from "../redux/rootSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from '../components/footer';
import { WithdrawalConfirm } from "../components/modals";

const Container = styled.div`
  min-width: 90vw;
  /* width: 90%; */
  min-height: 50vh;
  /* height: 50%; */
  margin: 20vh 10vh 10vh 10vh;
  display: flex;
  position: relative;
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

// export default function Mypage() {
//   const {isLogin} = useSelector(state => state.user);
//   const [isClicked, setIsClicked] = useState(false);
//   const [isAlert, setIsAlert] = useState(false);

//   console.log(isLogin);
//   const handleClick = function () {
//     setIsClicked(!isClicked);
//   };
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const projects = useSelector((state) => state.user.projects);
  const cards = useSelector((state) => state.user.cardList);
  const [isEditOn, setIsEditOn] = useState(false);
  const editnameRef = useRef();
  const [withdrawalModal, setWithdrawalModal] = useState(false);

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

  const withdrawalModalHandler = () => {
    setWithdrawalModal(!withdrawalModal);
  }

  useEffect(() => {
    console.log(userInfo, projects, cards);
    axios
      .get(`${process.env.REACT_APP_API_URL}/profile`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(setUserInfo(res.data.data));
      })
      .catch((err) => {
        console.log(err.response.data.message);
        navigate("/");
        //dispatch(setUserInfo(err.response.data.message));
      });
  }, []);

  return (
    <div>
      <Navigator />
      <Container>
        {withdrawalModal? <WithdrawalConfirm withdrawalModalHandler={withdrawalModalHandler} />: null}
        <Left>
          {/* {isEditOn ? <i onClick={UploadImage} className="fa-regular fa-pen-to-square"></i>: null} */}
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
                <Button warn={true} onClick={()=>{setWithdrawalModal(true)}}>회원탈퇴</Button>
              </div>
            </Upper>
            <Lower>
              <div>{`만든 프로젝트 ${projects.length}개, 참여한 프로젝트 3개`}</div>
              <div>{`만든 카드 ${cards.length}개, 매핑된 카드 27개`}</div>
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
              <div>{`만든 프로젝트 ${projects.length}개, 참여한 프로젝트 3개`}</div>
              <div>{`만든 카드 ${cards.length}개, 매핑된 카드 27개`}</div>
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
