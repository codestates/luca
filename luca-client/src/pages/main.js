import styled from "styled-components";
import Projectcard from "../components/projectcard";
import { Navigator, Backdrop, Container } from "../components/commons";
import { CreateProjectModal, Sortmodal} from "../components/modals";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjectList } from "../redux/rootSlice.js";
import axios from "axios";

const Maincomponent = styled.div`
  margin-top: 10vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  > startbox {
    background-color: gray;
    width: 100%;
    height: 250px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    > startinfo {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    > startbutton {
      border: solid;
      border-radius: 20px;
      width: 200px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    > startbutton:hover {
      box-shadow: 0px 0px 10px black;
    }
    > startbutton:active {
      color: red;
    }
  }
  > projectcontainer {
    position: relative;
    background-color: silver;
    height: 100vh;
    width: 1300px;
    display: flex;
    flex-direction: column;
    /* > projectcontainer> * {
        width: 1300px;
    } */
    > sortbox {
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
    > projectbox {
      /* margin-top: 10px; */
    }
  }
`;

export function Main() {
  const projects = useSelector((state) => state.user.projects);
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
    // const projectsClone = [...projectList];
    // if (e === "update") {
    //   projectsClone.sort((a, b) => {
    //     return (
    //       b.updatedAt.split(".").join("") - a.updatedAt.split(".").join("")
    //     );
    //   });
    //   setProjectList([...projectsClone]);
    //   console.log(projectList);
    // } else if (e === "create") {
    //   projectsClone.sort((a, b) => {
    //     return (
    //       b.createdAt.split(".").join("") - a.createdAt.split(".").join("")
    //     );
    //   });
    // }
    // setSortModal(!sortModal);
  };

  useEffect( async () => {
    const result = await axios.get('http://localhost:4000/project')
    dispatch(setProjectList(result.data.data));
  }, []);

  return (
    <div>
      <Navigator />
      <Backdrop onClick={isClicked ? modalHandler : null}>
        <Maincomponent>
          <startbox>
            <startinfo>
              <h2>Lorem ipsum</h2>
              img elements must have an alt prop, either with meaningful text,
              or an empty string for decorative images
            </startinfo>
            <startbutton onClick={modalHandler}>start</startbutton>
          </startbox>
          <projectcontainer>
            <sortbox>
              {sortModal ? (
                <div>
                  <div onClick={sortHandler}>sort by update ▲</div>
                  {/* <Sortmodal sortHandler={sortHandler}/> */}
                </div>
              ) : (
                <div onClick={sortHandler}>sort by update ▼</div>
              )}
            </sortbox>
            {sortModal ? <Sortmodal sortHandler={sortHandler} /> : null}
            <projectbox>
              {projects.map((el, i) => {
                return <Projectcard index={i} />;
              })}
            </projectbox>
          </projectcontainer>
        </Maincomponent>

        {isClicked ? (
          <CreateProjectModal
            modalHandler={modalHandler}
            // newProjectHandler={newProjectHandler}
          />
        ) : null}
      </Backdrop>
      <div className="footer"></div>
    </div>
  );
}

export default Main;
