import styled from "styled-components";

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
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  display: flex;
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

export function CreateProjectModal({ modalHandler }) {
  return (
    <ModalBackdrop onClick={() => modalHandler(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">새 프로젝트</div>
        <div className="modal-body">
          <div className="query">
            <button className="options">개인</button>
            <button className="options">팀</button>
          </div>
          <div className="query">
            <div className="index">이름</div>
            <input />
          </div>
          <div className="query">
            <div className="index">설명</div>
            <input />
          </div>
          <div className="query">
            <div className="index">초대</div>
            <input />
          </div>
        </div>
        <div className="modal-footer">
          <div className="buttons">
            <button onClick={() => modalHandler(false)}>취소</button>
            <button className="confirm">시작</button>
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
