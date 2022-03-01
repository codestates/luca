import { useState } from "react";
import styled from "styled-components";

const Searchfinder = styled.div`
  z-index: 999;
  position: fixed;
  top: 50px;
  left: 20px;
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.3);
  text-align: center;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > i {
    flex: 1 0 auto;
    font-size: 1.5em;
    color: rgb(160, 160, 160);
    margin: 12px;
  }
  > input {
    margin-left: 20px;
    flex: 1 0 auto;
    border: none;
    outline: 0;
    text-align: left;
  }
  > div.closer {
    flex: 1 0 auto;
  }

  animation-name: ${(props) => {
    if (props.isSearchOn !== null && props.isSearchOn === true) {
      return "seachbarOn";
    } else if (props.isSearchOn !== null && props.isSearchOn === false) {
      return "seachbarOut";
    }
  }};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  @keyframes seachbarOn {
    from {
      width: 48px;
    }
    to {
      width: 224px;
    }
  }
  @keyframes seachbarOut {
    from {
      width: 224px;
    }
    to {
      width: 48px;
    }
  }
`;

const Pathfinder = styled.div`
  z-index: 700;
  position: fixed;
  top: 120px;
  left: 88px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const PathContainer = styled.div`
  width: 94px;
  max-height: 500px;
  padding: 6px 6px 0 6px;
  background-color: white;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
    width: 0 !important;
  }
`;

const PathNode = styled.div`
  z-index: 750;
  width: 78px;
  height: auto;
  padding: 8px 8px 0 8px;
  padding-bottom: ${(props) =>
    props.data.length - 1 === props.index || props.index === 0 ? "8px" : "0"};
  margin-bottom: 6px;
  border-radius: 4px;
  color: rgb(80, 80, 80);
  background-color: white;
  font-weight: ${(props) =>
    props.data.length - 1 === props.index || props.index === 0
      ? "700"
      : "normal"};
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  text-align: center;
  word-break: break-word;
  cursor: default;
  > div {
    > i {
      font-size: 24px;
      color: rgb(180, 180, 180);
      text-align: center;
    }
  }
`;

const Resizer = styled.div`
  height: 20px;
  background-color: lightgrey;
  text-align: center;
  cursor: pointer;
  > i {
    font-size: 1.2em;
    color: grey;
  }
`;

export default function Finder({
  mapData,
  pathData,
  setHighlight,
  setTransform,
}) {
  const [isSearchOn, setIsSearchOn] = useState(null);
  const [height, setHeight] = useState("53.9vh");

  //console.log(mapData);

  const getFocused = (id) => {
    let target = mapData.filter((node) => node.data.id === id)[0];
    let focusX = Math.round(-target.x);
    let focusY = Math.round(-target.y);
    setTransform(0, 200, 3, 300, "easeOut");
    console.log("focusX: ", focusX);
    console.log("focusY: ", focusY);
  };

  const searchHandler = (e) => {
    let word = e.target.value;
    console.log("word", word);
    if (word.length > 0) {
      let resultArray = mapData.filter((node) => {
        return node.data.content.includes(word);
      });
      console.log("resultArray: ", resultArray);
      setHighlight({ list: resultArray, word: word });
    } else {
      setHighlight({ list: [], word: "" });
    }
  };

  const resizeStart = (e) => {
    console.log(e.clientY);
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    let posY = e.clientY;
  };

  const resize = (e) => {
    console.log(e.clientY);
    const curEdge = window.innerHeight / 10;
  };

  const resizeEnd = (e) => {
    console.log(e.clientY);
  };

  return (
    <div>
      <Searchfinder isSearchOn={isSearchOn}>
        {!isSearchOn ? (
          <i
            className="fa-solid fa-magnifying-glass-plus"
            onClick={() => setIsSearchOn(true)}
          ></i>
        ) : (
          <>
            <input onChange={searchHandler}></input>
            <div className="closer" onClick={() => setIsSearchOn(false)}>
              x
            </div>
          </>
        )}
      </Searchfinder>

      <Pathfinder>
        <PathContainer>
          {pathData.map((path, i) => (
            <PathNode
              key={i}
              data={pathData}
              index={i}
              onClick={() => getFocused(path.id)}
            >
              {path.content || mapData[0].data.content}
              <div>
                {pathData.length - 1 === i || i === 0 ? null : (
                  <i className="fa-solid fa-caret-down"></i>
                )}
              </div>
            </PathNode>
          ))}
        </PathContainer>
        <Resizer
          draggable
          onClick={() => setTransform(-200, -800, 2, 300, "easeOut")}
          onDragStart={resizeStart}
          onDrag={resize}
          onDragEnd={resizeEnd}
        >
          <i className="fa-solid fa-ellipsis"></i>
        </Resizer>
      </Pathfinder>
    </div>
  );
}
