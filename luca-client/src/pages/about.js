import axios from "axios";
import styled from "styled-components";
import { Navigator } from "../components/commons";
import { Footer } from "../components/commons";

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
  }
`;

const FeatureContainer = styled.div`
  width: 100vw;
  padding: 10rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  > img {
  }

  /* > video {
    margin-left: 5rem;
    border: solid lightgrey 6px;
    border-style: outset;
    border-radius: 10px;
    //object-fit: contain;
    width: 40%;
    height: 40%;
  } */

  > div.section {
    margin: 0 5rem;
    word-break: keep-all;
    div.heading {
      font-size: 2.5em;
      font-weight: 700;
      inline-size: 16em;
      line-height: 1.5em;
      margin: 0.5em 0;
    }
    div.sub {
      font-size: 1.5em;
      inline-size: 20em;
      margin: 0.5em 0;
    }
  }
`;

const Touchpoint = styled.div`
  height: 50vh;
  text-align: center;
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  > div.catcher {
  }
  > button {
    margin: 1em;
    font-size: 0.7em;
  }
`;

const guestLoginHandler = () => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/user/guest`)
    .then((res) => {
      console.log(res);
      window.location.reload();
      // axios.get(`${process.env.REACT_APP_API_URL}/profile`)
      // .then((res) => {
      //   console.log(res)
      // })
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function About() {
  return (
    <div>
      <Navigator />
      <>
        {dummyIntro.slice(0, 1).map((lorem, i) => (
          <IntroContainer key={i} color={i}>
            <div className="floater">
              <div className="title">{lorem.title}</div>
              <div className="desc">{lorem.desc}</div>
              <div className="action">
                <button onClick={guestLoginHandler}>{lorem.button}</button>
              </div>
            </div>
          </IntroContainer>
        ))}
        <FeatureContainer>
          <img
            src="search_n_find.gif"
            alt="search_n_find"
            width={"50%"}
            height={"50%"}
          ></img>
          <div className="section">
            <div className="heading">찾고 싶은 아이디어가 있으신가요?</div>
            <div className="sub">
              파편화된 생각들을 검색을 통해 빠르게 찾으세요.
            </div>
            <div className="sub">
              아이디어가 펼쳐진 트랙을 추적할 수 있습니다.
            </div>
          </div>
        </FeatureContainer>

        <FeatureContainer>
          <div className="section">
            <div className="heading">한눈에 확인하고 싶어요.</div>
            <div className="sub">원하는 스타일로 자유롭게 전환해보세요</div>
            <div className="sub">
              간편한 조작으로 다양한 기능을 활용할 수 있습니다
            </div>
          </div>

          <img
            src="view_switch.png"
            alt="view_switch"
            width={"50%"}
            height={"50%"}
          />
        </FeatureContainer>

        <FeatureContainer>
          <img src="add_card.jpg" alt="add_card" width={"50%"} height={"50%"} />

          <div className="section">
            <div className="heading">
              좋은 아이디어를 위해서 많은 의견이 필요해요.
            </div>
            <div className="sub">
              팀원과 생각을 공유하고, 아이디어를 발전시키세요
            </div>
            <div className="sub">모든 것을 실시간으로 함께할 수 있습니다</div>
          </div>
        </FeatureContainer>

        <Touchpoint>
          <div className="catcher">Luca와 함께 아이디어를 마음껏 펼치세요</div>
          <button>시작하기</button>
        </Touchpoint>
      </>

      <Footer />
    </div>
  );
}
