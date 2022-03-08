import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CardContainer = styled.div`
  z-index: 800;
  position: fixed;
  top: ${(props) => (props.isSidebar ? "13vh" : "none")};
  bottom: ${(props) => (props.isSidebar ? "none" : "1vh")};
  right: ${(props) => (props.isSidebar ? "2vh" : "20vh")};
  width: ${(props) => (props.isSidebar ? "18vh" : "50vw")};
  height: ${(props) => (props.isSidebar ? "68vh" : "18vh")};
  background-color: white;
  border-radius: 0vh 1vh 1vh 0vh;
  display: flex;
  flex-flow: column wrap;
  align-content: baseline;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.5);
  overflow: ${(props) => (props.isSidebar ? "scroll" : "scroll")};
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
    width: 0 !important;
  }

  animation-name: ${(props) => {
    if (props.isSidebar !== true) {
      return null;
    }
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
      width: 20vh;
      overflow: scroll;
    }
    to {
      width: 52vw;
      overflow: scroll;
    }
  }
  @keyframes containerOut {
    from {
      width: 52vw;
      overflow: scroll;
      scroll-snap-type: x proximity;
    }
    to {
      width: 18vh;
      overflow: scroll;
      scroll-snap-type: x proximity;
    }
  }
`;

const Transform = styled.div`
  z-index: 850;
  position: fixed;
  top: ${(props) => (props.isSidebar ? "10vh" : "none")};
  bottom: ${(props) => (props.isSidebar ? "none" : "1vh")};
  right: ${(props) => (props.isSidebar ? "3vh" : "20vh")};
  background: ${(props) => (props.isSidebar ? "none" : "lightgrey")};
  width: ${(props) => (props.isSidebar ? " 2.5vh" : "2vh")};
  height: ${(props) => (props.isSidebar ? " 2.5vh" : "18vh")};
  border-radius: ${(props) =>
    props.isSidebar ? "1vh 0 0 1vh" : "1vh 0vh 0vh 1vh"};
  margin-right: ${(props) => (props.isSidebar ? "none" : "49.5vw")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  > i {
    margin-left: 0.75vh;
    flex: 1 0 auto;
  }
  > button {
    border: none;
    background: none;
    color: grey;
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
      right: 21vh;
    }
    to {
      right: 52.9vw;
    }
  }
  @keyframes openerOut {
    from {
      right: 52.9vw;
    }
    to {
      right: 20vh;
    }
  }
`;

const Card = styled.div`
  z-index: 800;
  width: 14vh;
  height: 14vh;
  padding-top: 1px;
  margin: 0 1.5vh;
  background-color: ${(props) => `rgb${props.color}`};
  filter: ${(props) => (props.blocked ? "brightness(50%)" : "none")};
  box-shadow: 0vh 0.5vh 1vh 0vh rgba(0, 0, 0, 0.3);
  > div.content {
    padding: 10% 0 10% 7%;
    width: 82%;
    height: 80%;
    position: relative;
    font-size: 1.6vh;
    line-height: 2vh;
    word-break: break-all;
    overflow: hidden;
  }
`;

const CardDeleter = styled.div`
  z-index: 850;
  position: relative;
  top: 1.4vh;
  left: 14vh;
  width: 1.5vh;
  height: 1.5vh;
  padding: 0.5vh;
  border-radius: 1em;
  text-align: center;
  opacity: 80%;
  display: flex;
  flex-direction: column;
  > i {
    font-size: 2vh;
    flex: 1 0 auto;
    color: grey;
  }
`;

const CardAdder = styled.div`
  z-index: 900;
  position: fixed;
  bottom: 2.5vh;
  right: 3.5vh;
  width: 15vh;
  height: 15vh;
  background: ${(props) => `rgb${props.color}`};
  border-radius: 1vh;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 5vh;

  > div.adderbox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
    > i {
      opacity: 30%;
    }
  }

  > input {
    font-size: 0.7em;
    background: ${(props) => `rgb${props.color}`};
    padding: 0 10% 20% 10%;
    width: 80%;
    height: 60%;
    outline: none;
    border: none;
  }
  > button.submit {
    background: white;
    color: black;
    margin: 20px;
    padding: 0;
    text-align: center;
    padding: 20px;
    border-radius: 30px;
    font-size: large;
    font-weight: bold;
  }
  > div {
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;

    > button.yellow {
      background: rgb(253, 251, 209);
      margin: 5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: solid 1px;
      cursor: pointer;
    }
    > button.blue {
      background: rgb(183, 229, 237);
      margin: 5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: solid 1px;

      cursor: pointer;
    }
    > button.pink {
      background: rgb(249, 206, 218);
      margin: 5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: solid 1px;

      cursor: pointer;
    }

    > button:active {
      transform: translateY(2px);
    }
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
      > i {
        opacity: 1;
      }
    }
    to {
      width: 33vh;
      height: 33vh;
      border-radius: 0;
      > i {
        opacity: 0;
      }
    }
  }
  @keyframes adderClose {
    from {
      width: 33vh;
      height: 33vh;
      border-radius: 0;
    }
    to {
      width: 15vh;
      height: 15vh;
    }
  }
`;

export default function Cardboard({
  createCard,
  deleteCard,
  setDragItemId,
  mouseUp,
  mouseDown,
}) {
  const cardList = useSelector((state) => state.user.cardList);
  const userInfo = useSelector((state) => state.user.userInfo);
  const blockData = useSelector((state) => state.user.blockData);
  const [changeColor, setChangeColor] = useState("(253, 251, 209)");
  const [isCardContOpen, setIsCardContOpen] = useState(null);
  const [isAdderOpen, setIsAdderOpen] = useState(null);
  const [isSidebar, setIsSidebar] = useState(true);

  const newCardRef = useRef();
  const outSection = useRef();

  const sliderHandler = () => {
    setIsCardContOpen(!isCardContOpen);
  };

  const adderOpenHandler = () => {
    setIsAdderOpen(!isAdderOpen);
  };

  const handleCloseModal = (e) => {
    if (
      isAdderOpen &&
      (!outSection.current || !outSection.current.contains(e.target))
    ) {
      setIsAdderOpen(!isAdderOpen);
    }
  };

  const handleSidebarModal = () => {
    setIsSidebar(!isSidebar);
    return (
      <Transform
        onClick={sliderHandler}
        isCardContOpen={isCardContOpen}
        isSidebar={isSidebar}
      >
        {isSidebar ? (
          <button onClick={handleSidebarModal}>
            <i className="fa-solid fa-circle-chevron-down"></i>
          </button>
        ) : (
          <button onClick={handleSidebarModal}>
            <i className="fa-solid fa-circle-chevron-up"></i>
          </button>
        )}
      </Transform>
    );
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseModal);
    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  });

  const changeColorHandler = ({ color }) => {
    setChangeColor(color);
  };

  const createCardHandler = () => {
    let actual = newCardRef.current.value.replace(/ /g, "");
    if (actual.length > 0) {
      createCard(newCardRef.current.value, changeColor);
      newCardRef.current.value = "";
    }
  };

  const cardDragStart = (e) => {
    e.dataTransfer.setDragImage(
      e.target,
      e.target.offsetHeight / 2,
      e.target.offsetWidth / 2
    );
    setDragItemId(e.target.id);
    mouseDown(e.target.id);
  };

  const cardDragEnd = (e) => {
    mouseUp(e.target.id);
  };

  return (
    <div>
      <Transform
        onClick={sliderHandler}
        isCardContOpen={isCardContOpen}
        isSidebar={isSidebar}
      >
        {isSidebar ? (
          isCardContOpen ? null : (
            <button onClick={handleSidebarModal}>
              <i className="fa-solid fa-circle-chevron-down"></i>
            </button>
          )
        ) : (
          <button onClick={handleSidebarModal}>
            <i className="fa-solid fa-circle-chevron-up"></i>
          </button>
        )}
      </Transform>
      <CardContainer isCardContOpen={isCardContOpen} isSidebar={isSidebar}>
        {cardList.map((card, i) => {
          return blockData.isBlock && card.id === blockData.cardId ? (
            <div key={card.id}>
              <div style={{ height: "2.5vh" }}></div>
              <Card id={card.id} color={card.color} blocked={true}>
                <div
                  id={card.id}
                  draggable
                  onDragStart={cardDragStart}
                  onDragEnd={cardDragEnd}
                  className="content"
                >
                  {card.content}
                </div>
              </Card>
            </div>
          ) : (
            <div key={card.id}>
              {card.userId === userInfo.id ? (
                <CardDeleter
                  id={card.id}
                  draggable={false}
                  onClick={() => deleteCard(card.id)}
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </CardDeleter>
              ) : (
                <div style={{ height: "2.5vh" }}></div>
              )}
              <Card id={card.id} color={card.color}>
                <div
                  id={card.id}
                  draggable
                  onDragStart={cardDragStart}
                  onDragEnd={cardDragEnd}
                  className="content"
                >
                  {card.content}
                </div>
              </Card>
            </div>
          );
        })}
        {isSidebar ? (
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
        ) : null}
        <CardAdder
          color={changeColor}
          isCardContOpen={isCardContOpen}
          isAdderOpen={isAdderOpen}
          ref={outSection}
        >
          {isAdderOpen ? (
            <>
              <div>
                <button
                  className="yellow"
                  onClick={() =>
                    changeColorHandler({ color: "(253, 251, 209)" })
                  }
                />
                <button
                  className="blue"
                  onClick={() =>
                    changeColorHandler({ color: "(183, 229, 237)" })
                  }
                />
                <button
                  className="pink"
                  onClick={() =>
                    changeColorHandler({ color: "(249, 206, 218)" })
                  }
                />
              </div>
              <input
                color={changeColor}
                placeholder="text..."
                ref={newCardRef}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    createCardHandler();
                  }
                }}
                maxLength={60}
              />
            </>
          ) : (
            <div className="adderbox" onClick={adderOpenHandler}>
              <i className="fa-solid fa-circle-plus"></i>
            </div>
          )}
        </CardAdder>
      </CardContainer>
    </div>
  );
}
