import styled from "styled-components";
import { Navigator } from "../components/commons";


const dummyIntro = [
  {
    title: "Lorem ipsum",
    desc: "Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    button: "Exercitation",
  },
  {
    title: "Excepteur sint occaecat",
    desc: "Ut enim ad minim veniam, quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    button: "Duis aute",
  },
  {
    title: "Reprehenderit",
    desc: "Irure dolor in  in voluptate velit esse cillum dolore eu fugiat nulla pariatur. cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est",
    button: "Laborum",
  },
];

const IntroContainer = styled.div`
  font-family: "Poppins", sans-serif;
  width: 100vw;
  height: 110vh;
  background: ${(props) => {
    const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
    return `linear-gradient(
    to right bottom,
    #${randomColor()},
    #${randomColor()}
  )`;
  }};
  display: flex;
  align-items: center;
  align-content: center;
  > div.floater {
    flex: 1 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div.title {
      flex: 1 0 auto;
      font-size: 3em;
      font-weight: bold;
      margin-bottom: 0.25em;
    }
    > div.desc {
      flex: 1 0 auto;
      font-size: 2em;
      max-width: 60vw;
      margin-bottom: 1em;
    }
    > div.action {
      flex: 1 0 auto;
      > button {
        min-width: 20vh;
        height: 8vh;
        border-radius: 5vh;
        border-style: hidden;
        background-color: rgba(255, 255, 255, 0.5);
        font-size: 1.2em;
      }
    }
  }
`;

export default function About() {
  return (
    <div>
      <Navigator />
      {dummyIntro.map((lorem, i) => (
        <IntroContainer key={i} color={i}>
          <div className="floater">
            <div className="title">{lorem.title}</div>
            <div className="desc">{lorem.desc}</div>
            <div className="action">
              <button>{lorem.button}</button>
            </div>
          </div>
        </IntroContainer>
      ))}
    </div>
  );
}
