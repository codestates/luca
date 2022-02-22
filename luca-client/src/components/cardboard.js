import { useState } from "react/cjs/react.development";
import styled from "styled-components";

// 현재 <CardContainer>, <Opener>, <CardAdder> 에 각각 다른 animation이 적용되어 있습니다.
// <CardContainer>는 width 를, <Opener>, <CardAdder> 는 right 값을 변화시키는 keyframes 입니다.
// 1. 절대위치가 아닌, <CardContainer>에 flex 박스를 적용해 컴포넌트를 다시 구성하거나
// 2. animation 속성과 keyframes 속성을 묶어 함수형으로 작성하는 방식으로 리팩토링 할 수 있을 것입니다.

const CardContainer = styled.div`
  z-index: 800;
  position: fixed;
  top: 13vh;
  right: 3vh;
  width: 18vh;
  height: 84vh;
  background-color: white;
  border-radius: 0 1vh 1vh 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.5);

  animation-name: ${(props) => {
    if (props.isCardContOpen !== null && props.isCardContOpen === true) {
      return "containerIn";
    } else if (
      props.isCardContOpen !== null &&
      props.isCardContOpen === false
    ) {
      return "containerOut";
    }
  }};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;

  @keyframes containerIn {
    from {
      width: 18vh;
    }
    to {
      width: 100vh;
    }
  }

  @keyframes containerOut {
    from {
      width: 100vh;
    }
    to {
      width: 18vh;
    }
  }
`;

const Opener = styled.div`
  z-index: 800;
  position: fixed;
  top: 13vh;
  right: 21vh;
  width: 2.5vh;
  height: 84vh;
  background-color: lightgrey;
  border-radius: 1vh 0 0 1vh;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  cursor: pointer;
  > i {
    margin-left: 0.75vh;
    flex: 1 0 auto;
  }

  animation-name: ${(props) => {
    if (props.isCardContOpen !== null && props.isCardContOpen === true) {
      return "openerIn";
    } else if (
      props.isCardContOpen !== null &&
      props.isCardContOpen === false
    ) {
      return "openerOut";
    }
  }};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;

  @keyframes openerIn {
    from {
      right: 21vh;
    }
    to {
      right: 103vh;
    }
  }

  @keyframes openerOut {
    from {
      right: 103vh;
    }
    to {
      right: 21vh;
    }
  }
`;

const Card = styled.div`
  z-index: 900;
  width: 15vh;
  height: 15vh;
  margin: 1.5vh 1.5vh 0 1.5vh;
  background-color: cyan;
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.5);
`;

const CardAdder = styled.div`
  z-index: 900;
  position: fixed;
  bottom: 4.5vh;
  right: 26vh;
  width: 15vh;
  height: 15vh;
  background-color: white;
  border-radius: 1vh;
  box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  > div {
    font-size: 5vh;
    color: grey;
  }

  animation-name: ${(props) => {
    // if (props.isCardContOpen !== null) {
    //   if (props.isCardContOpen === true) {
    //     return "adderSlideIn";
    //   } else {
    //     return "adderSlideOut";
    //   }
    // }
    if (props.isAdderOpen !== null) {
      if (props.isAdderOpen === true) {
        return "adderOpen";
      } else {
        return "adderClose";
      }
    }
  }};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;

  @keyframes adderSlideIn {
    from {
      right: 25vh;
    }
    to {
      right: 107vh;
    }
  }

  @keyframes adderSlideOut {
    from {
      right: 107vh;
    }
    to {
      right: 25vh;
    }
  }

  @keyframes adderOpen {
    from {
      width: 15vh;
      height: 15vh;
    }
    to {
      width: 32vh;
      height: 32vh;
    }
  }

  @keyframes adderClose {
    from {
      width: 32vh;
      height: 32vh;
    }
    to {
      width: 15vh;
      height: 15vh;
    }
  }
`;

export default function Cardboard() {
  const [isCardContOpen, setIsCardContOpen] = useState(null); // default animation state
  const [isAdderOpen, setIsAdderOpen] = useState(null); // default animation state

  const sliderHandler = () => {
    setIsCardContOpen(!isCardContOpen);
  };

  const adderOpenHandler = () => {
    setIsAdderOpen(!isAdderOpen);
  };

  // console.log("isCardContOpen: ", isCardContOpen);
  // console.log("isAdderOpen: ", isAdderOpen);

  return (
    <div>
      <CardContainer isCardContOpen={isCardContOpen}>
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
        <Card>4</Card>
        <Card>5</Card>
        {/* <Card>상위 4개 limit로 .map</Card> */}
        <CardAdder
          isCardContOpen={isCardContOpen}
          isAdderOpen={isAdderOpen}
          onClick={adderOpenHandler}
        >
          <div>
            <i className="fa-solid fa-circle-plus"></i>
          </div>
        </CardAdder>
        <Opener
          className="opener"
          onClick={sliderHandler}
          isCardContOpen={isCardContOpen}
        >
          {isCardContOpen ? (
            <i className="fa-solid fa-angle-right"></i>
          ) : (
            <i className="fa-solid fa-angle-left"></i>
          )}
        </Opener>
      </CardContainer>
    </div>
  );
}
