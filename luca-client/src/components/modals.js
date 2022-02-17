import styled from "styled-components";
import { useRef, useState } from "react";

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
  background-color: black;
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
      margin: 0 0.3em;
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

export function LoginModal({ modalHandler }) {
  return (
    <ModalBackdrop onClick={() => modalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">로그인</div>
        <div className="modal-body">
          <div className="query">
            <div className="index">이메일</div>
            <input />
          </div>
          <div className="query">
            <div className="index">비밀번호</div>
            <input />
          </div>
          <span>계정이 없으신가요?</span>
          <span>
            <a href="">회원가입</a>
          </span>
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
  }

  return (
    <ModalBackdrop onClick={() => modalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">새 프로젝트</div>
        <div className="modal-body">
          <div className="query">
            <button className="options" onClick={()=>{handleType("flase")}}>개인</button>
            <button className="options" onClick={()=>{handleType("true")}}>팀</button>
          </div>
          <div className="query">
            <div className="index">이름</div>
            {/* <input onChange={(e)=>{newProjectHandler(e, "name")}}/> */}
            <input ref={nameRef}/>
          </div>
          <div className="query">
            <div className="index">설명</div>
            {/* <input onChange={(e)=>{newProjectHandler(e, "desc")}}/> */}
            <input ref={descRef}/>
          </div>
          <div className="query">
            <div className="index">초대</div>
            {/* <input onChange={(e)=>{newProjectHandler(e, "invite")}}/> */}
            <input ref={inviteRef}/>
          </div>
        </div>
        <div className="modal-footer">
          <div className="buttons">
            <button onClick={modalHandler}>취소</button>
            <button 
            className="confirm" 
            onClick={()=>{newProjectHandler(nameRef.current, descRef.current, inviteRef.current, type)}}>
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
`

export function Sortmodal ({sortHandler}) {

  return (
    <SortModalBody>
      <div onClick={()=>{sortHandler("update")}}>
        업데이트일 기준 정렬
      </div>
      <div onClick={()=>{sortHandler("create")}}>
        생성일 기준 정렬
      </div>
    </SortModalBody>
  )
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
`

export function Savealert () {
  return (
    <SaveAlertbox>
      <div>저장되었습니다</div>
    </SaveAlertbox>
  )
}