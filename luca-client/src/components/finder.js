import { useState } from "react";
import styled from "styled-components";

const Searchfinder = styled.input`
  z-index: 700;
  position: fixed;
  top: 6vh;
  left: 2vh;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.3);

  animation-name: ${(props) => {
    if (props.isSearchOn !== null && props.isSearchOn === true) {
      return "seachbarOn1";
    } else if (props.isSearchOn !== null && props.isSearchOn === false) {
      return "seachbarOut1";
    }
  }};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  @keyframes seachbarOn {
    from {
      width: 50px;
    }
    to {
      width: 200px;
    }
  }
  @keyframes seachbarOut {
    from {
      width: 200px;
    }
    to {
      width: 50px;
    }
  }
`;

const Pathfinder = styled.div`
  z-index: 700;
  position: fixed;
  top: 13vh;
  left: 10vh;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0vh 0vh 1vh rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const PathContainer = styled.div`
  width: 10vh;
  height: 53.9vh;
  padding: 1vh 1vh 0 1vh;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
    width: 0 !important;
  }
`;

const Resizer = styled.div`
  width: 12vh;
  height: 20px;
  background-color: lightgrey;
  text-align: center;
  cursor: pointer;
`;

const PathNode = styled.div`
  z-index: 750;
  width: 8vh;
  height: 8vh;
  padding: 1vh;
  margin-bottom: 1vh;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  font-size: 0.8em;
  word-break: break-word;
`;

export default function Finder({ mapData, pathData, setHighlight }) {
  const [isSearchOn, setIsSearchOn] = useState(null);
  const [height, setHeight] = useState("53.9vh");

  const searchHandler = (e) => {
    let word = e.target.value;
    if (word.length > 0) {
      let resultArray = mapData.filter((node) => {
        return node.data.content.includes(word);
      });
      setHighlight({ list: resultArray, word: word });
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
      <Searchfinder
        isSearchOn={isSearchOn}
        onClick={() => setIsSearchOn(!isSearchOn)}
        onChange={searchHandler}
      />
      <Pathfinder>
        <PathContainer>
          {pathData.map((path, i) => (
            <PathNode key={i}>
              {path.content || mapData[0].data.content}
            </PathNode>
          ))}
        </PathContainer>
        <Resizer
          draggable
          onDragStart={resizeStart}
          onDrag={resize}
          onDragEnd={resizeEnd}
        >
          ...
        </Resizer>
      </Pathfinder>
    </div>
  );
}
