import axios from "axios";
import styled from "styled-components";
import { Navigator } from "../components/commons";
import { Footer } from "../components/commons";

const IntroContainer = styled.div`
  font-family: "Poppins", sans-serif;
  width: 100vw;
  height: 110vh;
  background-color: orange;
  background: linear-gradient(to right bottom, tomato, orange);
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
      inline-size: 20em;
      flex: 1 0 auto;
      font-size: 2em;
      max-width: 60vw;
      margin-bottom: 1em;
    }
    > div.action {
      flex: 1 0 auto;
      > button {
        font-size: 1.4em;
        padding: 0.5em 1em;
        border-radius: 2em;
        border-style: hidden;
        background-color: rgba(255, 255, 255, 0.4);
        cursor: pointer;
      }
      > button:hover {
        font-weight: bold;
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

const FeatureContainer = styled.div`
  width: 100vw;
  padding: 10rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: #f3f5f7;
  border-bottom: solid lightgrey 1px;

  > img {
    min-width: 800px;
    width: 40%;
    height: 40%;
    border: solid lightgrey 1px;
    border-radius: 8px;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  }

  > div.section {
    max-width: 500px;
    max-height: 300px;
    margin-left: 7rem;
    margin-bottom: 3rem;
    word-break: keep-all;
    div.heading {
      color: #4e453c;
      margin: 2rem 0;
      font-size: 3rem;
      font-weight: 700;
      inline-size: 10em;
      line-height: 1.5em;
    }

    div.sub {
      margin: 0.3em 0;
      color: #7f5a34;
      font-size: 1.5em;
      inline-size: 20em;
      line-height: 1.5em;
    }
    div.sub2 {
      margin: 0.3em 0;
      color: #7f5a34;
      font-size: 1.5em;
      inline-size: 30em;
      line-height: 2em;
      > span.icon {
        padding: 0.3em;
        font-size: 0.8em;
        margin-right: 0.5em;
        border-radius: 0.3em;
        background-color: lightgrey;
        color: grey;
      }
      > span.command {
        padding: 0.3em;
        font-size: 0.8em;
        margin-right: 0.5em;
        border-radius: 0.3em;
        background-color: lightgrey;
        color: black;
        box-shadow: 0 0 0.3em rgba(0, 0, 0, 0.5);
      }
      > span.impact {
        color: darkorange;
        font-weight: 550;
      }
    }
  }
`;

const FeatureContainer2 = styled(FeatureContainer)`
  background-color: white;
  div.section {
    margin-right: 7rem;
  }
`;

const OutroContainer = styled(IntroContainer)`
  height: 40vh;

  > div.floater {
    > div.title {
      font-size: 2em;
    }

    > div.action {
      > button {
        margin: 1em;
      }
    }
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
        <IntroContainer>
          <div className="floater">
            <div className="title">모든 것은 아이디어에서 시작됩니다</div>
            <div className="desc">
              Luca와 함께 아이디어를 기록하고, 구조화하세요. 팀원을 초대해
              브레인스토밍을 함께 하세요.
            </div>
            <div className="action">
              <button onClick={guestLoginHandler}>체험하기</button>
            </div>
          </div>
        </IntroContainer>

        <FeatureContainer>
          <img src="search_n_find.gif" alt="search_n_find"></img>
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

        <FeatureContainer2>
          <div className="section">
            <div className="heading">
              좋은 아이디어를 위해서 많은 의견이 필요해요
            </div>
            <div className="sub">
              팀원과 생각을 공유하고, 아이디어를 발전시키세요.
            </div>
            <div className="sub">모든 것을 실시간으로 함께할 수 있습니다.</div>
          </div>

          <img src="add_card.jpg" alt="add_card" />
        </FeatureContainer2>

        <FeatureContainer>
          <img src="switch_views.gif" alt="switch_views" />
          <div className="section">
            <div className="heading">한눈에 확인하고 싶어요</div>
            <div className="sub2">원하는 스타일로 자유롭게 전환해보세요.</div>
            <div className="sub2">
              <span className="icon">
                <i className="fa-solid fa-equals"></i>
              </span>
              <span className="command">동일한 간격</span>으로{" "}
              <span className="impact">처음 아이디어 순</span>으로 정렬하거나,
            </div>

            <div className="sub2">
              <span className="icon">
                <i className="fa-solid fa-maximize"></i>
              </span>
              <span className="command">모양 유지</span>로{" "}
              <span className="impact">마지막 아이디어 순</span>으로 정렬할 수
              있어요.
            </div>

            <div className="sub2">
              <span className="icon">
                <i className="fa-solid fa-ruler-horizontal"></i>
              </span>
              <span className="command">스케일</span>로 마인드맵의{" "}
              <span className="impact">전체 크기를 조절</span>할 수 있어요.
            </div>
          </div>
        </FeatureContainer>

        <OutroContainer>
          <div className="floater">
            <div className="title">Luca와 함께 아이디어를 마음껏 펼치세요</div>

            <div className="action">
              <button onClick={guestLoginHandler}>비회원으로 시작하기</button>
              <button onClick={guestLoginHandler}>
                <a href="/signup">회원가입</a>
              </button>
            </div>
          </div>
        </OutroContainer>
      </>

      <Footer />
    </div>
  );
}
