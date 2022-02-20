import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProjectList, updateProjectList } from "../redux/rootSlice";

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

function Projectcard({ index }) { //projects에서 해당 프로젝트를 구분하기 위해 메인페이지에서 projects의 인덱스를 내려주었습니다.
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.user.projects);
  const userInfo = useSelector((state) => state.user.userInfo);
  const titleRef = useRef();
  const descRef = useRef();
  // console.log(data.id)
  const [isClicked, setIsClicked] = useState(false);
  const [cardData, setCardData] = useState({...projects[index]});

  const editProjectHandler = (title, desc) => {
    // console.log(name.value);
    // console.log(desc.value);
    if (title.value === "" || desc.value === "") {
      alert("빈칸을 채워주세요.");
      return;
    } else {
      setCardData({...cardData, title: title.value, desc: desc.value}); //수정 하자마자 변경된 값을 보여주기 위해 react states를 사용합니다.
      const editReqData = {projectId: projects[index].id, title: title.value, desc: desc.value}; //이후에 서버로 업데이트 요청을 합니다.
      axios.patch(`${process.env.REACT_APP_API_URL}/project`, 
        editReqData,
        {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        console.log('요청성공');
      })
      .catch((err) => {
        console.log('에러');
      })
    }
  };

  const deleteProjectHandler = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/project/${projects[index].id}`)
    .then((res) => {
      console.log(res)
      window.location.reload(); // 임시로 새로고침 합니다.
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handlePartyRequest = (el) => {
    // console.log(userInfo.id, projects[index])
    if(el === "accept"){
      axios.patch(`${process.env.REACT_APP_API_URL}/project/accept`, {
        userId: userInfo.Id,
        projectId: projects[index].id,
        isAccept: true
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    else if(el === "refuse"){
      axios.patch(`${process.env.REACT_APP_API_URL}/project/accept`, {
        userId: userInfo.Id,
        projectId: projects[index].id,
        isAccept: false
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  return (
    <ProjectcardBody>
      <div className="projectcardhead">
        <div className="projectname">
          <h2>{isClicked ? <input ref={titleRef} /> : cardData.title}</h2>
          <div className="date">{cardData.updatedAt}</div>
        </div>
        <div className="projectfunc">
          {
          cardData.isAccept === 1?
          null:
          <div className="acceptbox">
            <div onClick={()=>{handlePartyRequest("accept")}}>수락</div>
            <div onClick={()=>{handlePartyRequest("refuse")}}>거절</div>
          </div>
          }
          <div className="type">{cardData.isTeam ? "팀" : "개인"}</div>
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
              <div onClick={deleteProjectHandler}>
                삭제
              </div>
              </>
            ) : (
              <i className="fa-regular fa-pen-to-square"></i>
            )}
          </div>
        </div>
      </div>
      <div className="projectcardbottom">
        <div className="desc">
          {isClicked ? <input ref={descRef} /> : cardData.desc}
        </div>
        <div className="projectinfo">
          5명의 참여자, 30개의 카드, 23개의 매칭
        </div>
      </div>
    </ProjectcardBody>
  );
}

export default Projectcard;
