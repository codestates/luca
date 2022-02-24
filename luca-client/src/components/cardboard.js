import { useEffect, useState } from "react/cjs/react.development";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { setCardList } from "../redux/rootSlice";
// 현재 <CardContainer>, <Opener>, <CardAdder> 에 각각 다른 animation이 적용되어 있습니다.
// <CardContainer>는 width 를, <Opener>, <CardAdder> 는 right 값을 변화시키는 keyframes 입니다.
// 1. 절대위치가 아닌, <CardContainer>에 flex 박스를 적용해 컴포넌트를 다시 구성하거나
// 2. animation 속성과 keyframes 속성을 묶어 함수형으로 작성하는 방식으로 리팩토링 할 수 있을 것입니다.
// -> 현재 독립된 animation 으로 구현

const CardContainer = styled.div`
  z-index: 800;
  position: fixed;
  top: 13vh;
  right: 2vh;
  width: 18vh;
  height: 68vh;
  background-color: white;
  border-radius: 0vh 1vh 1vh 0vh;
  display: flex;
  flex-flow: column wrap;
  align-content: baseline;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.5);
  overflow: hidden;

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
      overflow: scroll;
    }
    to {
      width: 108vh;
      overflow: scroll;
    }
  }

  @keyframes containerOut {
    from {
      width: 108vh;
      //overflow: hidden;
      //scroll-snap-type: x proximity;
    }
    to {
      width: 18vh;
      //overflow: hidden;
      //scroll-snap-type: x proximity;
    }
  }
`;

const Opener = styled.div`
  z-index: 850;
  position: fixed;
  top: 13vh;
  right: 20vh;
  width: 2.5vh;
  height: 68vh;
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
      right: 20vh;
    }
    to {
      right: 110vh;
    }
  }

  @keyframes openerOut {
    from {
      right: 110vh;
    }
    to {
      right: 20vh;
    }
  }
`;

const Card = styled.div`
  z-index: 800;
  width: 11vh;
  height: 11vh;
  margin: 1.4vh 1.5vh 0vh 1.5vh;
  padding: 2vh;
  background-color: lightyellow;
  box-shadow: 0vh 0.5vh 1vh 0vh rgba(0, 0, 0, 0.3);
`;

const CardAdder = styled.div`
  z-index: 900;
  position: fixed;
  bottom: 2.5vh;
  right: 3.5vh;
  width: 15vh;
  height: 15vh;
  background-color: white;
  border-radius: 1vh;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.5);
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

  @keyframes adderOpen {
    from {
      width: 15vh;
      height: 15vh;
    }
    to {
      width: 33vh;
      height: 33vh;
    }
  }

  @keyframes adderClose {
    from {
      width: 33vh;
      height: 33vh;
    }
    to {
      width: 15vh;
      height: 15vh;
    }
  }
`;

export default function Cardboard({ createCard, deleteCard, setDragItemId, mouseUp, mouseDown }) {
  // let projectIdRef = window.location.href.split("/").reverse()[0];
  const cardList = useSelector((state) => state.user.cardList);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isBlock = useSelector((state) => state.user.isblock);

  const [isCardContOpen, setIsCardContOpen] = useState(null); // default animation state
  const [isAdderOpen, setIsAdderOpen] = useState(null); // default animation state

  const sliderHandler = () => {
    setIsCardContOpen(!isCardContOpen);
  };

  const adderOpenHandler = () => {
    console.log(cardList)
    setIsAdderOpen(!isAdderOpen);
    if (isAdderOpen){
      createCard()
    }
  };

  const cardDragStart = (e) => {
    setDragItemId(e.target.id);
    mouseDown();
    console.log("drag start! card id: ", e.target.id);
  };
  const cardDragEnd = (e) => {
    mouseUp();
    console.log("drag end! card id: ", e.target.id);
    // canvas 에 드롭 이벤트가 발생했다면, card data 에서 일치하는 card id 를 찾아 삭제해야합니다.
  };

  return (
    <div>
      <CardContainer isCardContOpen={isCardContOpen}>
        {cardList.map((card, i) => {
          return ( isBlock ? (
            <div>
              <Card
                key={card.id}
                id={card.id}
                draggable
                onDragStart={cardDragStart}
                onDragEnd={cardDragEnd}
              >
                {card.content}
              </Card>
              {(card.userId === userInfo.id ? <button onClick={() => deleteCard(card.id)}>X</button> : null)}
              <button>Block</button>
            </div>) : (
            <div>
              <Card
                key={card.id}
                id={card.id}
                draggable
                onDragStart={cardDragStart}
                onDragEnd={cardDragEnd}
              >
                {card.content}
              </Card>
              {(card.userId === userInfo.id ? <button onClick={() => deleteCard(card.id)}>X</button> : null)}
            </div>) )
          
 

        })}
        {/* <Card>상위 4개 limit로 할 필요 없음 .map</Card> */}
        {/* websocket 으로 카드 데이터 받을때는 key={card.id} 로 매핑할 것 */}
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
