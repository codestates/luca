import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Canvas2 from "../components/canvas2";
import Canvas3 from "../components/canvas3";
import Cardboard from "../components/cardboard";
import { useEffect, useCallback, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setCardList, setMindmapTree, setIsBlock } from '../redux/rootSlice';
import { useNavigate } from "react-router-dom";
// import Timer from '../components/timer';
const socket = io.connect(`${process.env.REACT_APP_API_URL}`)

export default function Project() {
  const curProjectId = window.location.href.split("/").reverse()[0]
  // window.location.href(`http://${process.env.REACT_APP_API_URL}/project/${curProjectId}`);
  // const navigate = useNavigate();
  // navigate(`http://${process.env.REACT_APP_API_URL}/project/${curProjectId}`);
  const dispatch = useDispatch();

  const roomName = `${curProjectId}`
  const userId = useSelector((state) => state.user.userInfo.id);

  // const [isBlock, setIsBlock] = useState(false);
  const disconnectSocket = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  // 처음 입장할 때만 소켓 연결해준다.
  useEffect(() => {
    console.log(roomName)
    socket.emit("enterRoom", roomName);
    socket.on("enterRoom", (data, count) => {
      // console.log(`Number of participants: ${count}`);
      console.log("SOCKETIO connect EVENT: ", data, " client connect");
    });
    
    socket.emit("initData", roomName);

    socket.on("initData", (cardInfo, mindmapInfo) => {
      dispatch(setCardList(cardInfo));
      dispatch(setMindmapTree(mindmapInfo));
    })
  }, []);

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  // 카드를 추가한다.
  const createCard = () => {
    socket.emit("createCard", userId, "data", roomName);
  }

  // 카드를 삭제한다.
  const deleteCard = (id) => {
    socket.emit("deleteCard", id, roomName);
  }

  const mouseDown = () => {
    console.log('마우스 다운')
    // setIsBlock(true);
    socket.emit("editBlockStart", roomName);
  }
  const mouseUp = () => {
    console.log('마우스 업')
    // setIsBlock(false);
    socket.emit("editBlockEnd", roomName);
  }

  const addMindmapHandler = (id) => {
    socket.emit("addMindmap", {cardId: id, parentId: 575}, roomName);
  }

  // 배열이 업데이트될 때마다 계속해서 추가로 리스너가 등록되는 것을 방지하기 위해 useEffect 사용)
  useEffect(() => {
    socket.on("createCard", (data) => {
      dispatch(setCardList(data));
      console.log(data);
    });

    socket.on("deleteCard", (data) => {
      dispatch(setCardList(data));
      console.log(data);
    });

    socket.on("editBlockStart", (data) => {
      dispatch(setIsBlock(data.isBlock))
      console.log(data.isBlock);
    });

    socket.on("editBlockEnd", (data) => {
      dispatch(setIsBlock(data.isBlock))
      console.log(data.isBlock);
    });

    socket.on("addMindmap", (cardInfo, mindmapInfo) => {
      dispatch(setCardList(cardInfo))
      dispatch(setMindmapTree(mindmapInfo))
    });
  }, [])
  // //const projects = useSelector((state) => state.user.projects);
  // let dummyCardlist = [
  //   { id: 0, content: "lorem ipsum" },
  //   { id: 1, content: "dolor sit amet" },
  //   { id: 2, content: "consectetur adipiscing elit" },
  //   { id: 3, content: "sed do eiusmod tempor" },
  //   { id: 4, content: "incididunt ut labore et dolore" },
  //   { id: 5, content: "magna aliqua" },
  //   { id: 6, content: "ut enim ad minim veniam" },
  //   { id: 7, content: "quis nostrud exercitation ullamco" },
  //   { id: 8, content: "laboris nisi ut aliquip ex ea commodo consequat" },
  //   { id: 9, content: "duis aute irure dolor in reprehenderit" },
  //   { id: 10, content: "excepteur sint" },
  //   { id: 11, content: "occaecat cupidatat" },
  //   { id: 12, content: "non proident" },
  //   { id: 13, content: "sunt in culpa qui" },
  //   { id: 14, content: "officia deserunt" },
  //   { id: 15, content: "mollit anim id" },
  //   { id: 16, content: "est laborum" },
  // ];

  return (
    <div>
      {/* <Navigator /> */}
      {/* <Timer />
      <Canvas />
      <Cardboard createCard={createCard} deleteCard={deleteCard} addMindmapHandler={addMindmapHandler}/>
      <button onClick={() => { createCard() }}>create</button>
      <button onClick={() => { deleteCard() }}>Delete</button>
      <button onMouseDown={() => mouseDown()} onMouseUp={() => mouseUp()}>block</button> */}
      <Canvas3 />
      <Cardboard cardData={dummyCardlist} />
    </div>
  );
}