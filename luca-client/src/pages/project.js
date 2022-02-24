import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Cardboard from "../components/cardboard";
import { useEffect, useCallback } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setCardList, setMindmapTree, setIsBlock } from '../redux/rootSlice';
import Timer from '../components/timer';

const socket = io.connect(`${process.env.REACT_APP_API_URL}`)

export default function Project() {
  const dispatch = useDispatch();
  const roomName = window.location.href.split("/").reverse()[0]
  const userId = useSelector((state) => state.user.userInfo.id);
  const isBlock = useSelector((state) => state.user.isBlock);
  const projectId = useSelector((state) => state.user.projectId);

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

  // 뒤로 가기를 하면 소켓 연결이 끊어진다.
  useEffect(() => {
    return () => {
      disconnectSocket();
      window.location.reload();
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

  const BlockStart = () => {
    socket.emit("editBlockStart", true, roomName);
    console.log(isBlock)
  }

  const BlockEnd = () => {
    socket.emit("editBlockEnd", false, roomName);
    console.log(isBlock)
  }

  const addMindmap = (id) => {
    socket.emit("addMindmap", {parentId: 382, cardId:id}, roomName);
  }

  const deleteMindmap = (id) => {
    socket.emit("addMindmap", id, roomName);
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
      dispatch(setIsBlock(data));
      console.log(data);
    });
    socket.on("editBlockEnd", (data) => {
      dispatch(setIsBlock(data));
      console.log(data);
    });
    socket.on("addMindmap", (cardInfo, mindmapInfo) => {
      dispatch(setMindmapTree(mindmapInfo));
      dispatch(setCardList(cardInfo));
    });
    socket.on("deleteMindmap", (cardInfo, mindmapInfo) => {
      dispatch(setMindmapTree(mindmapInfo));
      dispatch(setCardList(cardInfo));
    });
  }, [])

  return (
    <div>
      <Navigator />
      <Timer />
      <Canvas />
      <Cardboard createCard = {createCard} deleteCard = {deleteCard} addMindmap = {addMindmap}/>
      <button onMouseDown={() => BlockStart()} onMouseUp={() => BlockEnd()}>block</button>
    </div>
  );
}
