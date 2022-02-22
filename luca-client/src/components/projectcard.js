import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProjectList, updateProjectList, setProjectId } from "../redux/rootSlice";
import { Link } from "react-router-dom";

const ProjectcardBody = styled.div`
  background-color: seashell;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
  margin-top: 20px;
  > div.projectcardhead {
    background-color: #f5f5f5;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    > div.projectname {
      display: flex;
      justify-content: row;
      align-items: center;
      > h2 {
        min-width: 200px;
        width: auto;
      }
      > div.date {
        margin-left: 20px;
      }
    }
    > div.projectfunc {
      display: flex;
      text-align: center;
      height: 100%;
      > div.acceptbox {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: row;
        width: 100px;
        margin-right: 20px;
      }
      > div.type {
        border: solid;
        height: 90%;
        width: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
      }
      > div.modifybox {
        border: solid;
        height: 90%;
        width: 100px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        > div {
          border: solid green;
        }
      }
      > div.modifybox:hover {
        /* color: red; */
        box-shadow: 0px 0px 10px black;
      }
      > div.modifybox:active {
        color: red;
      }
    }
  }
  > div.projectcardbottom {
    display: flex;
    justify-content: space-between;
    > div.desc {
      min-width: 350px;
      width: auto;
    }
    > div.projectinfo {
      min-width: 350;
      width: auto;
    }
  }
`;

function Projectcard({ projectInfo, index }) {
  //projects에서 해당 프로젝트를 구분하기 위해 메인페이지에서 projects의 인덱스를 내려주었습니다.
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.user.projects);
  const userInfo = useSelector((state) => state.user.userInfo);
  const titleRef = useRef();
  const descRef = useRef();
  // console.log(data.id)
  const [isClicked, setIsClicked] = useState(false);
  // const [cardData, setCardData] = useState({...projects[index]});

  const editProjectHandler = (title, desc) => {
    if (title.value || desc.value) {
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
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          // console.log(res);
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
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ProjectcardBody>
      {/* {console.log(userInfo)} */}
      <div className="projectcardhead">
        <Link to={`/project/${projectInfo.id}`}>
          <div className="projectname">
            <h2>{isClicked ? <input ref={titleRef} /> : projectInfo.title}</h2>
            <div className="date">{projectInfo.updatedAt}</div>
          </div>
        </Link>
        <div className="projectfunc">
          {projectInfo.isAccept === 1 ? null : (
            <div className="acceptbox">
              <div
                onClick={() => {
                  handlePartyRequest("accept");
                }}
              >
                수락
              </div>
              <div
                onClick={() => {
                  handlePartyRequest("refuse");
                }}
              >
                거절
              </div>
            </div>
          )}
          <div className="type">{projectInfo.isTeam ? "팀" : "개인"}</div>
          <div
            className="modifybox"
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          >
            {isClicked ? (
              <>
                <div
                  onClick={() => {
                    editProjectHandler(titleRef.current, descRef.current);
                  }}
                >
                  확인
                </div>
                <div onClick={deleteProjectHandler}>삭제</div>
              </>
            ) : (
              <i className="fa-regular fa-pen-to-square"></i>
            )}
          </div>
        </div>
      </div>
      <div className="projectcardbottom">
        <div className="desc">
          {isClicked ? <input ref={descRef} /> : projectInfo.desc}
        </div>
        <div className="projectinfo">
          5명의 참여자, 30개의 카드, 23개의 매칭
        </div>
      </div>
    </ProjectcardBody>
  );
}

export default Projectcard;
