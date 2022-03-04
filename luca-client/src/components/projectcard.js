import styled from "styled-components";
import { color } from "../styles";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProjectList } from "../redux/rootSlice";
import { DeleteProjectModal } from "./modals";
import axios from "axios";

const ProjectCover = styled.div`
  min-width: 200px;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  cursor: default;
  border: solid 1px lightgray;
  max-height: 250px;

  > div.top {
    padding: 20px 20px 0 30px;
    display: flex;

    > div.title {
      font-size: 2em;
      font-weight: 600;
      margin-right: 5px;
      color: white;
      > a {
        cursor: pointer;
        color: ${color.primaryDark};
      }
    }

    > input.title-edit {
      width: 350px;
      font-size: 2em;
      font-weight: 600;
      margin-right: 5px;
      outline: none;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      border-bottom-width: 2px;
      border-color: lightgrey;
    }

    > input.title-edit:focus {
      border-color: #ff7f50;
    }

    > button.edit {
      margin-right: 30px;
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      > i {
        color: rgb(150, 150, 150);
      }
    }

    > button.acceptbox {
      margin: auto 0;
      height: 100%;
      border: none;
      background: none;
      > i {
        text-align: center;
        font-size: 2.2em;
        color: green;
      }
    }
    > button.refusebox {
      margin: auto 0;
      height: 100%;
      border: none;
      background: none;
      > i {
        text-align: center;
        font-size: 2.2em;
        color: red;
      }
    }
  }

  > div.desc {
    padding: 10px 30px;
    font-size: 1.2em;
    font-weight: 500;
    color: grey;
  }

  > input.desc-edit {
    width: 350px;
    margin-left: 30px;
    margin-top: 0.5em;
    font-size: 1.2em;
    outline: none;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 2px;
    border-color: lightgrey;
  }
  > input.desc-edit:focus {
    border-color: #ff7f50;
  }

  > div.origin {
    padding: 10px 30px;
    > p {
      margin: 16px 0;
      color: rgb(150, 150, 150);
      > span.keyword {
        border-radius: 4px;
        background: none;
        padding: 0.5em;
        margin-right: 0.3em;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        background-color: rgb(240, 240, 240);
      }
      > span {
        font-weight: bold;
      }
    }
  }

  > div.edit-box {
    padding: 10px 30px;

    > button.confirm-edit {
      margin: 16px 10px 0 0;
      width: 40px;
      height: 30px;
      font-weight: bold;
      border-radius: 4px;
      background-color: gray;
      border: none;
      box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }

    > div.delete {
      margin: 16px 20px 16px 0;
      font-weight: bold;
      text-decoration: underline;
      font-size: 0.9em;
    }

    > div.delete:hover {
      color: red;
      cursor: pointer;
    }
  }

  > div.summary {
    font-size: 0.9em;
    font-weight: bold;
    padding: 10px 30px;
    background-color: ${color.primary};
    flex: 1 0 auto;
    color: white;
  }
`;

const UnitLabel = styled.div`
  padding: 0.5em;
  margin: 0 0 auto auto;
  font-size: 0.8em;
  font-weight: 600;
  border-radius: 2em;
  color: rgb(70, 70, 70);
  background-color: ${(props) => (props.team ? "PaleTurquoise" : "PeachPuff")};
  filter: saturate(35%);
`;
function Projectcard({ projectInfo, index }) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const titleRef = useRef();
  const descRef = useRef();
  const [isEditOn, setIsEditOn] = useState(false);
  const [modal, setModal] = useState(false);

  const modalHandler = (modalType) => {
    setModal(modalType);
  };

  const editProjectHandler = (title, desc) => {
    title.value = title.value || projectInfo.title;
    desc.value = desc.value || projectInfo.desc;

    dispatch(
      updateProjectList({
        index: index,
        inputData: [title.value, desc.value],
      })
    );
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/project`,
        {
          projectId: projectInfo.id,
          title: title.value,
          desc: desc.value,
        },
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsEditOn(false);
  };

  const deleteProjectHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/project/${projectInfo.id}`)
      .then(() => {
        window.location.reload(); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePartyRequest = (el) => {
    if (el === "accept") {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/project/accept`, {
          userId: userInfo.id,
          projectId: projectInfo.id,
          isAccept: true,
        })
        .then(() => {
          window.location.reload(); 
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (el === "refuse") {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/project/accept`, {
          userId: userInfo.id,
          projectId: projectInfo.id,
          isAccept: false,
        })
        .then(() => {
          window.location.reload(); 
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ProjectCover>
      {modal === "deleteProject" ? (
        <DeleteProjectModal
          modalHandler={modalHandler}
          deleteProjectHandler={deleteProjectHandler}
        />
      ) : null}
      {isEditOn ? (
        <>
          <div className="top">
            <input
              className="title-edit"
              placeholder={projectInfo.title}
              ref={titleRef}
            />
          </div>
          <input
            className="desc-edit"
            placeholder={projectInfo.desc}
            ref={descRef}
          />
        </>
      ) : (
        <>
          <div className="top">
            <div className="title">
              {projectInfo.isAccept ? (
                <Link to={`/project/${projectInfo.id}`}>
                  {projectInfo.title}
                </Link>
              ) : (
                <a>{projectInfo.title}</a>
              )}
            </div>
            <button
              className="edit"
              index={index}
              onClick={() => setIsEditOn(true)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            {projectInfo.isAccept === 1 ? null : (
              <button
                className="acceptbox"
                onClick={() => {
                  handlePartyRequest("accept");
                }}
              >
                <i className="fa-solid fa-circle-check"></i>
              </button>
            )}
            {projectInfo.isAccept === 1 ? null : (
              <button
                className="refusebox"
                onClick={() => {
                  handlePartyRequest("refuse");
                }}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
            <UnitLabel className="unit-label" team={projectInfo.isTeam}>
              {projectInfo.isTeam ? "Team" : "Private"}
            </UnitLabel>
          </div>
          <div className="desc">{projectInfo.desc}</div>
        </>
      )}
      {!isEditOn ? (
        <div className="origin">
          <p>
            <span>{projectInfo.username}</span> 님이{" "}
            <span>{projectInfo.createdAt.slice(0, 10)}</span> 일에
          </p>
          <p>
            <span className="keyword">{projectInfo.keyword}</span> 로 시작함
          </p>
        </div>
      ) : (
        <div className="edit-box">
          <button
            className="confirm-edit"
            index={index}
            onClick={() =>
              editProjectHandler(titleRef.current, descRef.current)
            }
          >
            저장
          </button>
          <button
            className="confirm-edit"
            onClick={() => setIsEditOn(false)}
            cancel={1}
          >
            취소
          </button>
          <div className="delete" onClick={() => modalHandler("deleteProject")}>
            프로젝트 삭제
          </div>
        </div>
      )}
      <div className="summary">
        참여한 사람 {projectInfo.numUser}명, 만들어진 카드 {projectInfo.numCard}
        개, 매핑된 카드 {projectInfo.numMindmap}개
      </div>
    </ProjectCover>
  );
}

export default Projectcard;
