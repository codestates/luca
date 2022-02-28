import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteProjectModal } from "./modals";
import axios from "axios";
import {
  setProjectList,
  updateProjectList,
  setProjectId,
} from "../redux/rootSlice";
import { Link } from "react-router-dom";

const ProjectCover = styled.div`
  min-width: 200px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  cursor: default;
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.3);

  > div.top {
    padding: 20px 20px 0 30px;
    display: flex;

    > div.title {
      font-size: 2em;
      font-weight: 600;
      margin-right: 5px;
      > a {
        cursor: pointer;
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
      background-color: white;
      > i {
        color: rgb(150, 150, 150);
      }
    }

    > button.acceptbox {
      margin: auto 0;
      height: 100%;
      border: none;
      background-color: white;
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
      background-color: white;
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
      background-color: white;
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
    /* background-color: #f0b27a; */
    background-color: rgb(150, 150, 150);
    flex: 1 0 auto;
  }
`;

const UnitLabel = styled.div`
  padding: 0.5em 1em;
  margin: auto 0 auto auto;
  border-radius: 2em;
  background-color: ${(props) => (props.team ? "lightgreen" : "lightpink")};
`

function Projectcard({ projectInfo, index }) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.user.projects);
  const userInfo = useSelector((state) => state.user.userInfo);
  const titleRef = useRef();
  const descRef = useRef();
  const [isEditOn, setIsEditOn] = useState(false);
  const [modal, setModal] = useState(false);
  // const [cardData, setCardData] = useState({...projects[index]});

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
      .then((res) => {
        // console.log(res);
        window.location.reload(); // 임시로 새로고침 합니다.
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePartyRequest = (el) => {
    // console.log(userInfo.id, userInfo)
    if (el === "accept") {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/project/accept`, {
          userId: userInfo.id,
          projectId: projectInfo.id,
          isAccept: true,
        })
        .then((res) => {
          window.location.reload(); // 임시로 새로고침 합니다.
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
        .then((res) => {
          window.location.reload(); // 임시로 새로고침 합니다.
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
          modalHandler={(modalHandler)} deleteProjectHandler={deleteProjectHandler}
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
              {(projectInfo.isAccept ? <Link to={`/project/${projectInfo.id}`}>{projectInfo.title}</Link> : <a>{projectInfo.title}</a>)}
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
            <span>user{projectInfo.admin}</span> 님이{" "}
            {projectInfo.createdAt.slice(0, 10)}
            일에
          </p>
          <p>
            <span>seed idea</span> 로 시작함
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
            <div
              className="delete"
              onClick={() => modalHandler("deleteProject")}
            >
              프로젝트 삭제
            </div>
        </div>
      )}
      <div className="summary">
        참여한 사람 4명, 만들어진 카드 46개, 매핑된 카드 39개
      </div>

    </ProjectCover>
  );
}

export default Projectcard;
