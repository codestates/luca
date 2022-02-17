import styled from "styled-components";
import { useRef, useState } from "react";
import axios from "axios";
const serverUrl = "http://localhost:4000";

// ============모달 props 사용법==========================

// const [modal, SetModal] = useState(false);

// const modalHandler = (modalType) => {
//   SetModal(modalType);
// };

// return (
//   <div>
//     <button onClick={() => modalHandler("login")}>로그인 모달 열기</button>
//     <button onClick={() => modalHandler("createProject")}>
//       프로젝트 추가 모달 열기
//     </button>
//     <button onClick={() => modalHandler("deleteProject")}>
//       프로젝트 삭제 모달 열기
//     </button>
//     {modal === "login" ? <LoginModal modalHandler={modalHandler} /> : null}
//     {modal === "createProject" ? (
//       <CreateProjectModal modalHandler={modalHandler} />
//     ) : null}
//     {modal === "deleteProject" ? (
//       <DeleteProjectModal modalHandler={modalHandler} />
//     ) : null}
//   </div>
// );

// ============여기까지가 모달 props 사용법==========================

// const ModalContainer = styled.div``;

const ModalBackdrop = styled.div`
  z-index: 900;
  width: 100vw;
  top: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  display: flex;
  /////////////////////flowervillagearp////////////////////////////
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalView = styled.div`
  flex: 1 0 auto;
  max-width: 600px;
  //min-height: 400px;
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
        width: 70%;
        margin: 0 3em 0 1em;
        font-size: 1.2rem;
        outline: none;
        border-top-width: 0;
        border-left-width: 0;
        border-right-width: 0;
        border-bottom-width: 0.5px;
        border-color: rgba(0, 0, 0, 0.1);
      }

      > input:focus {
        border-bottom-width: 2.5px;
        border-color: rgba(0, 0, 0, 0.5);
      }

      button.options {
        flex: 1 0 auto;
        font-size: 1.2em;
        margin: 0.5em;
        // 탭으로 구현할 것
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
        background-color: lightyellow;
      }
    }
  }
`;

export function LoginModal({ modalHandler, setUserinfo }) {
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
    axios.post(`${serverUrl}/user/login`, loginInfo).then((res) => {
      if (res.data.message === "Wrong email") {
        return setErrorMessage("이메일 주소를 확인해주세요");
      }
      if (res.data.message === "Wrong password") {
        return setErrorMessage("비밀번호를 확인해주세요");
      }
      if (res.data.message === "Internal server error") {
        return setErrorMessage("서버 에러: 지금은 로그인할 수 없습니다");
      }
      if (res.status === 200) {
        setErrorMessage("");
        setUserinfo(res.data.data);
      }
    });
  };

  console.log(loginInfo);

  return (
    <ModalBackdrop onClick={() => modalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">로그인</div>
        <div className="modal-body">
          <div className="query">
            <div className="index">이메일</div>
            <input onChange={(e) => handleInputValue(e, "email")} />
          </div>
          <div className="query">
            <div className="index">비밀번호</div>
            <input
              onChange={(e) => handleInputValue(e, "password")}
              type="password"
            />
          </div>
          <span>계정이 없으신가요?</span>
          <a href="/signup">
            <span impact>회원가입</span>
          </a>
        </div>
        <div className="modal-footer">
          <div className="buttons">
            <button>소셜 로그인</button>
            <button className="confirm">로그인</button>
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

export function CreateProjectModal({ modalHandler, newProjectHandler }) {
  const nameRef = useRef();
  const descRef = useRef();
  const inviteRef = useRef();
  const typeRef = useRef();

  const [type, setType] = useState("");

  const handleType = (e) => {
    setType(e);
  };

  return (
    <ModalBackdrop onClick={() => modalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">새 프로젝트</div>
        <div className="modal-body">
          <div className="query">
            <button
              className="options"
              onClick={() => {
                handleType("flase");
              }}
            >
              개인
            </button>
            <button
              className="options"
              onClick={() => {
                handleType("true");
              }}
            >
              팀
            </button>
          </div>
          <div className="query">
            <div className="index">이름</div>
            {/* <input onChange={(e)=>{newProjectHandler(e, "name")}}/> */}
            <input ref={nameRef} />
          </div>
          <div className="query">
            <div className="index">설명</div>
            {/* <input onChange={(e)=>{newProjectHandler(e, "desc")}}/> */}
            <input ref={descRef} />
          </div>
          <div className="query">
            <div className="index">초대</div>
            {/* <input onChange={(e)=>{newProjectHandler(e, "invite")}}/> */}
            <input ref={inviteRef} />
          </div>
        </div>
        <div className="modal-footer">
          <div className="buttons">
            <button onClick={modalHandler}>취소</button>
            <button
              className="confirm"
              onClick={() => {
                newProjectHandler(
                  nameRef.current,
                  descRef.current,
                  inviteRef.current,
                  type
                );
              }}
            >
              생성
            </button>
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

export function DeleteProjectModal({ modalHandler }) {
  return (
    <ModalBackdrop onClick={() => modalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">프로젝트 #12 를 삭제하시겠습니까?</div>
        <div>삭제한 프로젝트는 복구할 수 없습니다</div>
        <div className="modal-footer">
          <div className="buttons">
            <button onClick={() => modalHandler(false)}>취소</button>
            <button className="confirm">삭제</button>
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
}

const SortModalBody = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid red;
  position: fixed;
  top: 40%;
  left: 78.5%;
  /* transform: translate(-50%, -50%); */
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
