import styled from "styled-components";
import Projectcard from "../components/projectcard";
import { Navigator, Footer } from "../components/commons";
import { CreateProjectModal, Sortmodal } from "../components/modals";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjectList } from "../redux/rootSlice.js";
import axios from "axios";
//import { compose } from '@reduxjs/toolkit';

// const Maincomponent = styled.div`
//   margin-top: 10vh;
//   background-color: #f5f5f5;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   > div.startbox {
//     background-color: gray;
//     width: 100%;
//     height: 250px;
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     justify-content: space-around;
//     > div.startinfo {
//       display: flex;
//       align-items: center;
//       flex-direction: column;
//     }
//     > div.startbutton {
//       border: solid;
//       border-radius: 20px;
//       width: 200px;
//       height: 30px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     > div.startbutton:hover {
//       box-shadow: 0px 0px 10px black;
//     }
//     > div.startbutton:active {
//       color: red;
//     }
//   }
//   > div.projectcontainer {
//     position: relative;
//     background-color: silver;
//     height: 100vh;
//     width: 1300px;
//     display: flex;
//     flex-direction: column;
//     /* > projectcontainer> * {
//         width: 1300px;
//     } */
//     > div.sortbox {
//       /* background-color: red; */
//       width: 100%;
//       height: 30px;
//       border-bottom: solid;
//       margin-top: 20px;
//       display: flex;
//       justify-content: flex-end;
//       align-items: center;
//       > div {
//         margin-right: 10px;
//       }
//       > div:hover {
//         text-shadow: 0px 0px 10px black;
//       }
//       /* > div:active {
//         color: red;
//       } */
//     }
//     > div.projectbox {
//       /* margin-top: 10px; */
//     }
//   }
// `;

// export function Main() {
//   let projects = useSelector((state) => state.user.projects);
//   const dispatch = useDispatch();
//   const [isClicked, setIsClicked] = useState(false);
//   const [sortModal, setSortModal] = useState(false);

//   const modalHandler = () => {
//     setIsClicked(!isClicked);
//   };

//   const sortHandler = (e) => {
//     let projectsClone = projects;

//     if (e === "update") {
//       projectsClone = projects.slice().sort((a, b) => {
//         return parseInt(a.updatedAt.split("-").join("")) <
//           parseInt(b.updatedAt.split("-").join(""))
//           ? -1
//           : parseInt(a.updatedAt.split("-").join("")) >
//             parseInt(b.updatedAt.split("-").join(""))
//           ? 1
//           : 0;
//       });
//       dispatch(setProjectList(projectsClone));
//       // console.log("sortHandler projectClone");
//       // console.log(projectsClone);
//     } else if (e === "create") {
//       projectsClone = projects.slice().sort((a, b) => {
//         return parseInt(a.createdAt.split("-").join("")) <
//           parseInt(b.createdAt.split("-").join(""))
//           ? -1
//           : parseInt(a.createdAt.split("-").join("")) >
//             parseInt(b.createdAt.split("-").join(""))
//           ? 1
//           : 0;
//       });
//       // console.log("sortHandler projectClone");
//       // console.log(projectsClone);
//       dispatch(setProjectList(projectsClone));
//     }
//     setSortModal(!sortModal);
//   };

//   useEffect(async () => {
//     const result = await axios.get(`${process.env.REACT_APP_API_URL}/project`);
//     dispatch(setProjectList(result.data.data));
//   }, []);

//   return (
//     <div>
//       {/* {console.log(projects)} */}
//       <Navigator />
//       <Backdrop onClick={isClicked ? modalHandler : null}>
//         <Maincomponent>
//           <div className="startbox">
//             <div className="startinfo">
//               <h2>Lorem ipsum</h2>
//               img elements must have an alt prop, either with meaningful text,
//               or an empty string for decorative images
//             </div>
//             <div className="startbutton" onClick={modalHandler}>
//               start
//             </div>
//           </div>
//           <div className="projectcontainer">
//             <div className="sortbox">
//               {sortModal ? (
//                 <div>
//                   <div onClick={sortHandler}>Sort</div>
//                   {/* <Sortmodal sortHandler={sortHandler}/> */}
//                 </div>
//               ) : (
//                 <div onClick={sortHandler}>Sort</div>
//               )}
//             </div>
//             {sortModal ? <Sortmodal sortHandler={sortHandler} /> : null}
//             <div className="projectbox">
//               {projects.map((el, i) => {
//                 return <Projectcard projectInfo={el} index={i} key={el.id} />;
//               })}
//             </div>
//           </div>
//         </Maincomponent>

//         {isClicked ? (
//           <CreateProjectModal
//             modalHandler={modalHandler}
//             // newProjectHandler={newProjectHandler}
//           />
//         ) : null}
//       </Backdrop>
//       <div className="footer"></div>
//       <Footer />
//     </div>
//   );
// }

const Container = styled.div`
  position: absolute;
  top: 10vh;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: blue;
`;

const randomColor = () => Math.floor(Math.random() * 10777215).toString(16);

const Banner = styled.div`
  flex: 1 0 auto;
  min-height: 16vh;
  padding: 4vh 0;
  background-color: white;
  background: linear-gradient(to right bottom, #ff7f50, orange);
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    color: white;
  }

  > div.project-intro {
    font-size: 1.1em;
    font-weight: bold;
    margin: 0.3em 0;
    color: white;
    letter-spacing: 0.2em;
  }
  > button {
    margin-top: 1em;
    width: 8em;
    font-size: 1.1em;
    padding: 0.6em 1em;
    border-radius: 2em;
    border: none;
    font-weight: bold;
    color: rgb(70, 70, 70);
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.3);
  }
`;

const Section = styled.div`
  flex: 1 0 auto;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Sorter = styled.div`
  min-height: 3vh;
  background-color: cyan;
`;

const Gallery = styled.div`
  flex: 1 0 auto;
  margin: 0 1.5vw;
  background-color: violet;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const ProjectCover = styled.div`
  width: 19vw;
  padding: 2vw;
  height: 14vw;
  margin: 0.5vw;
  border-radius: 6px;
  background-color: tomato;
`;

let prCompo = {
  id: "integer",
  title: "string",
  desc: "string",
  isTeam: "boolean",
  admin: "integer",
  createdAt: "string",
  updatedAt: "string",
};

export default function Main() {
  return (
    <div>
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
          <button>시작하기</button>
        </Banner>

        <Section>
          <Sorter>Sorter</Sorter>
          <Gallery>
            <ProjectCover>ProjectCover</ProjectCover>
            <ProjectCover>ProjectCover</ProjectCover>
            <ProjectCover>ProjectCover</ProjectCover>
            <ProjectCover>ProjectCover</ProjectCover>
            <ProjectCover>ProjectCover</ProjectCover>
            <ProjectCover>ProjectCover</ProjectCover>
            <ProjectCover>ProjectCover</ProjectCover>
            <ProjectCover>ProjectCover</ProjectCover>
          </Gallery>
        </Section>
      </Container>
      <Footer />
    </div>
  );
}
