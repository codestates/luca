import styled from "styled-components";
import Projectcard from "../components/projectcard";
import { Navigator, Footer } from "../components/commons";
import { CreateProjectModal } from "../components/modals";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProjectList,
  updateProjectList,
  setProjectId,
  setIsLogin,
} from "../redux/rootSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import { compose } from '@reduxjs/toolkit';

const Container = styled.div`
  margin-top: 10vh;
  width: 100vw;
  height: auto;
`;

const Banner = styled.div`
  min-height: 16vh;
  padding: 4vh 0;
  background: linear-gradient(to right bottom, #ff7f50, orange);
  filter: saturate(100%);
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    font-weight: 750;
    letter-spacing: 0.05em;
    color: white;
  }

  > div.project-intro {
    font-size: 1.1em;
    font-weight: bold;
    margin: 0.3em 0;
    color: white;
    letter-spacing: 0.1em;
  }
  > div.start {
    margin-top: 1em;
    width: 8em;
    padding: 0.6em 1em;
    border-radius: 2em;
    border: none;
    font-size: 1.1em;
    font-weight: bold;
    text-align: center;
    color: rgb(70, 70, 70);
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.2);
  }
`;

const Section = styled.div`
  background-color: rgb(250, 250, 250);
  display: flex;
  flex-direction: column;
`;

const Sorter = styled.div`
  z-index: 500;
  padding-top: 10px;
  min-height: 36px;
  background-color: #faf8f6;
  border-bottom: lightgrey solid 1px;
  /* box-shadow: 0vh 0vh 1vh 0.1vh rgba(0, 0, 0, 0.1); */

  > div.dropdowner {
    position: absolute;
    width: 120px;
    right: 24px;
    height: 20px;
    margin: 8px 10px;
    text-align: center;
    cursor: pointer;

    > div.selection {
      margin-top: 5px;
      width: 100px;
      border-radius: 6px;
      text-align: right;
      background-color: white;
      border: solid lightgrey 1px;
      overflow: hidden;
      > div {
        padding: 10px;
        border-bottom: solid lightgrey 1px;
        cursor: pointer;
      }
      > div:hover {
        color: peru;
        background-color: #faf8f6;
      }
    }
  }
`;

const Gallery = styled.div`
  margin: 0 24px;
  background-color: rgb(250, 250, 250);
  padding-top: 24px;
  padding-bottom: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
  min-height: 500px;
`;

const FooterContainer = styled.div`
  /* border: solid red; */
`;

const GuidMessage = styled.div`
  font: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* border: solid 3px #FFB400; */
  width: 70%;
  height: 30%;
  > p {
    font-size: 1.5em;
    color: #D2691E;
    margin-top: 0px;
  }
  > div.new-project {
    /* margin-top: 1em; */
    width: 8em;
    padding: 0.6em 1em;
    border-radius: 2em;
    border: none;
    font-size: 1.1em;
    font-weight: bold;
    text-align: center;
    color: rgb(70, 70, 70);
    /* background-color: #FFB400; */
    cursor: pointer;
    box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.2);
    background: linear-gradient(to right bottom, #FFB400, orange);
  }
`

export default function Main() {
  let projects = useSelector((state) => state.user.projects);
  console.log("projects: ", projects);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [sorterOn, setSorterOn] = useState(false);
  const [curSort, setCurSort] = useState("업데이트 순");

  const modalHandler = (modalType) => {
    setModal(modalType);
  };

  const sortHandler = (opt) => {
    let sortedProjects = projects;

    if (opt === "updatedAt") {
      sortedProjects = projects.slice().sort((b, a) => {
        return parseInt(a.updatedAt.split("-").join("")) <
          parseInt(b.updatedAt.split("-").join(""))
          ? -1
          : parseInt(a.updatedAt.split("-").join("")) >
            parseInt(b.updatedAt.split("-").join(""))
            ? 1
            : 0;
      });
      dispatch(setProjectList(sortedProjects));
      setCurSort("업데이트 순");
    } else if (opt === "createdAt") {
      sortedProjects = projects.slice().sort((b, a) => {
        return parseInt(a.createdAt.split("-").join("")) <
          parseInt(b.createdAt.split("-").join(""))
          ? -1
          : parseInt(a.createdAt.split("-").join("")) >
            parseInt(b.createdAt.split("-").join(""))
            ? 1
            : 0;
      });
      dispatch(setProjectList(sortedProjects));
      setCurSort("생성일 순");
    }
    setSorterOn(!sorterOn);
  };

  useEffect(async () => {
    const result = await axios
      .get(`${process.env.REACT_APP_API_URL}/project`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(setIsLogin(false));
          navigate("/");
        }
      });
    dispatch(setProjectList(result.data.data));
  }, []);

  return (
    <div>
      {modal === "createProject" ? (
        <CreateProjectModal modalHandler={modalHandler} />
      ) : null}
      <Navigator />
      <Container>
        <Banner>
          <h2>모든 것은 아이디어에서 시작됩니다.</h2>
          <div className="project-intro">
            Luca와 함께 아이디어를 기록하고, 구조화하세요.
          </div>
          <div className="project-intro">
            팀원을 초대해 브레인스토밍을 함께 하세요.
          </div>
          <div className="start" onClick={() => modalHandler("createProject")}>
            시작하기
          </div>
        </Banner>

        <Section>
          <Sorter>
            <div className="dropdowner" onClick={() => setSorterOn(!sorterOn)}>
              {curSort} <i className="fa-solid fa-caret-down"></i>
              {sorterOn ? (
                <div className="selection">
                  <div onClick={() => sortHandler("updatedAt")}>
                    업데이트 순
                  </div>
                  <div onClick={() => sortHandler("createdAt")}>생성일 순</div>
                </div>
              ) : null}
            </div>
          </Sorter>
          <Gallery>
            {
              projects.length > 0 ?
                projects.map((project, i) => (
                  <Projectcard projectInfo={project} index={i} key={project.id} />
                )) :
                <GuidMessage>
                  <p>아직 프로젝트가 없습니다. 새로운 프로젝트를 시작해보세요!</p>
                  <div className="new-project" onClick={() => modalHandler("createProject")}>새프로젝트</div>
                </GuidMessage>
            }
          </Gallery>
        </Section>
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </Container>
    </div>
  );
}
