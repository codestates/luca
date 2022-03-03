import axios from "axios";
import styled from "styled-components";
import { Navigator } from "../components/commons";
import Footer from '../components/footer';

const dummyIntro = [
  {
    title: "모든 것은 아이디어에서 시작됩니다. ",
    desc: "Luca와 함께 아이디어를 기록하고, 구조화하세요. 팀원을 초대해 브레인스토밍을 함께 하세요.",
    button: "체험하기",
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
        cursor: pointer;
      }
    }
    > div.animationbox {
      position: absolute;
      top: 30%;
      left: 49%;
      transform: translate(-50%,-50%);
      > ul {
        list-style: none;
        >li{
          display: inline-block;
          margin-right: 20px;
          font-size: 5em;
          color: #fff;
          opacity: 1;
          transition: all 3s ease;
        }
    }
    > ul li:nth-child(1) { transform: translate3d(-60, 0, 0); };
    > ul li:nth-child(2) { transform: translate3d(-30, 0, 0); };
    > ul li:nth-child(3) { transform: translate3d(30, 0, 0); };
    > ul li:nth-child(4) { transform: translate3d(60, 0, 0); };
    }
  }
`;



const guestLoginHandler = () => {
  axios.get(`${process.env.REACT_APP_API_URL}/user/guest`)
    .then((res) => {
      console.log(res)
      window.location.reload();
      // axios.get(`${process.env.REACT_APP_API_URL}/profile`)
      // .then((res) => {
      //   console.log(res)
      // })
    })
    .catch((err) => {
      console.log(err)
    })
}

export default function About() {
  return (
    <div>
      <Navigator />
      {dummyIntro.map((lorem, i) => (
        <IntroContainer key={i} color={i}>
          <div className="floater">
            <div className="animationbox">
              <ul>
                <li>L</li>
                <li>U</li>
                <li>C</li>
                <li>A</li>
              </ul>
            </div>
            <div className="title">{lorem.title}</div>
            <div className="desc">{lorem.desc}</div>
            <div className="action">
              <button onClick={guestLoginHandler}>{lorem.button}</button>
            </div>
          </div>
        </IntroContainer>
      ))}
      <Footer />
    </div>
  );
}
