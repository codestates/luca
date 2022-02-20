import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
        width: 90px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
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

function Projectcard({ data }) {
  const nameRef = useRef();
  const descRef = useRef();

  const [isClicked, setIsClicked] = useState(false);
  const [cardData, setCardData] = useState(data);

  const editProjectHandler = (name, desc) => {
    // console.log(name.value);
    // console.log(desc.value);
    if (name.value === "" || desc.value === "") {
      alert("빈칸을 채워주세요.");
      return;
    } else {
      setCardData({ ...data, title: name.value, desc: desc.value });
      console.log(data);
      // 엑시오스 요청 post
    }
    // axios.post("url", data)
  };

  return (
    <ProjectcardBody>
      <div className="projectcardhead">
        <div className="projectname">
          <h2>{isClicked ? <input ref={nameRef} /> : cardData.title}</h2>
          <div className="date">{cardData.createdAt}</div>
        </div>
        <div className="projectfunc">
          <div className="type">{cardData.isTeam ? "팀" : "개인"}</div>
          <div
            className="modifybox"
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          >
            {isClicked ? (
              <div
                onClick={() => {
                  editProjectHandler(nameRef.current, descRef.current);
                }}
              >
                확인
              </div>
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
