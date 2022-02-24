import styled from "styled-components";
import Projectcard from "../components/projectcard";
import { Navigator, Backdrop, Container } from "../components/commons";
import { CreateProjectModal, Sortmodal } from "../components/modals";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjectList } from "../redux/rootSlice.js";
import axios from "axios";
import { compose } from '@reduxjs/toolkit';
import Footer from '../components/footer';

const Maincomponent = styled.div`
  margin-top: 10vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div.startbox {
    background-color: gray;
    border-radius: 0px 0px 20px 20px;
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    > div.startinfo {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    > div.startbutton {
      border: solid;
      border-radius: 20px;
      width: 200px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > div.startbutton:hover {
      box-shadow: 0px 0px 10px black;
    }
    > div.startbutton:active {
      color: red;
    }
  }
  > div.projectcontainer {
    position: relative;
    background-color: silver;
    height: 100vh;
    width: 1300px;
    display: flex;
    flex-direction: column;
    /* > projectcontainer> * {
        width: 1300px;
    } */
    > div.sortbox {
      /* background-color: red; */
      width: 100%;
      height: 30px;
      border-bottom: solid;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > div {
        margin-right: 10px;
      }
      > div:hover {
        text-shadow: 0px 0px 10px black;
      }
      /* > div:active {
        color: red;
      } */
    }
    > div.projectbox {
      /* margin-top: 10px; */
    }
  }
`;

export function Main() {
  let projects = useSelector((state) => state.user.projects);
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  // const [newProject, setNewProject] = useState({});
  const [sortModal, setSortModal] = useState(false);

  const modalHandler = () => {
    setIsClicked(!isClicked);
  };

  // const newProjectHandler = (name, desc, invite, type) => {
  //   setNewProject({
  //     title: name,
  //     desc: desc,
  //     isTeam: type,
  //   });
  //   console.log(name.value);
  //   console.log(desc.value);
  //   console.log(invite.value);
  //   console.log(type);
  //   // axios.post()
  // };

  const sortHandler = (e) => {
    let projectsClone = projects;

    if (e === "update") {
      projectsClone = projects.slice().sort((b, a) => {
        return parseInt(a.updatedAt.split("-").join("")) <
          parseInt(b.updatedAt.split("-").join(""))
          ? -1
          : parseInt(a.updatedAt.split("-").join("")) >
            parseInt(b.updatedAt.split("-").join(""))
            ? 1
            : 0;
      });
      dispatch(setProjectList(projectsClone));
      console.log("sortHandler projectClone");
      console.log(projectsClone);
    } else if (e === "create") {
      projectsClone = projects.slice().sort((b, a) => {
        return parseInt(a.createdAt.split("-").join("")) <
          parseInt(b.createdAt.split("-").join(""))
          ? -1
          : parseInt(a.createdAt.split("-").join("")) >
            parseInt(b.createdAt.split("-").join(""))
            ? 1
            : 0;
      });
      console.log("sortHandler projectClone");
      console.log(projectsClone);
      dispatch(setProjectList(projectsClone));
    }
    setSortModal(!sortModal);
  };

  useEffect(async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/project`);
    dispatch(setProjectList(result.data.data));
  }, []);

  return (
    <div>
      {/* {console.log(projects)} */}
      <Navigator />
      <Backdrop onClick={isClicked ? modalHandler : null}>
        <Maincomponent>
          <div className="startbox">
            <div className="startinfo">
              <h2>Lorem ipsum</h2>
              img elements must have an alt prop, either with meaningful text,
              or an empty string for decorative images
            </div>
            <div className="startbutton" onClick={modalHandler}>
              start
            </div>
          </div>
          <div className="projectcontainer">
            <div className="sortbox">
              {sortModal ? (
                <div>
                  <div onClick={sortHandler}>Sort</div>
                  {/* <Sortmodal sortHandler={sortHandler}/> */}
                </div>
              ) : (
                <div onClick={sortHandler}>Sort</div>
              )}
            </div>
            {sortModal ? <Sortmodal sortHandler={sortHandler} /> : null}
            <div className="projectbox">
              {projects.map((el, i) => {
                return <Projectcard projectInfo={el} index={i} key={el.id} />;
              })}
            </div>
          </div>
        </Maincomponent>

        {isClicked ? (
          <CreateProjectModal
            modalHandler={modalHandler}
          // newProjectHandler={newProjectHandler}
          />
        ) : null}
      </Backdrop>
      <div className="footer"></div>
      <Footer />
    </div>
  );
}

export default Main;
