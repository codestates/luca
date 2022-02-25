import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Canvas2 from "../components/canvas2";
import Canvas3 from "../components/canvas3";
import Cardboard from "../components/cardboard";
import { useEffect, useCallback, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setCardList, setMindmapTree, setBlockData } from '../redux/rootSlice';
import { useNavigate } from "react-router-dom";

export default function Project() {
  const socket = io.connect(`${process.env.REACT_APP_API_URL}`)
  const curProjectId = window.location.href.split("/").reverse()[0]
  // const navigate = useNavigate();
  // navigate(`http://${process.env.REACT_APP_API_URL}/project/${curProjectId}`);
  const dispatch = useDispatch();

  const [dragItemId, setDragItemId] = useState(null);

  const roomName = `${curProjectId}`
  const userId = useSelector((state) => state.user.userInfo.id);

  // const [isBlock, setIsBlock] = useState(false);
  const disconnectSocket = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  // 처음 입장할 때만 소켓 연결해준다.
  useEffect(() => {
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
      // window.location.reload();
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

  const mouseDown = (id) => {
    console.log('마우스 다운')
    // setIsBlock(true);
    socket.emit("editBlockStart", { cardId: Number(id), isBlock: true }, roomName);
  }
  const mouseUp = (id) => {
    console.log('마우스 업')
    // setIsBlock(false);
    socket.emit("editBlockEnd", { cardId: Number(id), isBlock: false }, roomName);
  }

  const addMindmapHandler = (id) => {
    socket.emit("addMindmap", {cardId: dragItemId, parentId: id}, roomName);
  }

  const deleteMindmapHandler = (id) => {
    socket.emit("deleteMindmap", { cardId: id }, roomName);
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
      console.log('==asdf==',data);
      dispatch(setBlockData(data))
      console.log(data);
    });

    socket.on("editBlockEnd", (data) => {
      console.log('==asdf==',data);
      dispatch(setBlockData(data))
      console.log('==asdf==',data);
    });

    socket.on("addMindmap", (cardInfo, mindmapInfo) => {
      dispatch(setCardList(cardInfo))
      dispatch(setMindmapTree(mindmapInfo))
    });

    socket.on("deleteMindmap", (cardInfo, mindmapInfo) => {
      dispatch(setCardList(cardInfo))
      dispatch(setMindmapTree(mindmapInfo))
    });
  }, [])

  return (
    <div>
      {/* <Navigator /> */}
      <Canvas3 addMindmapHandler={addMindmapHandler} />
      <Cardboard createCard={createCard} deleteCard={deleteCard} addMindmapHandler={addMindmapHandler} setDragItemId={setDragItemId} mouseDown={mouseDown} mouseUp={mouseUp} />
    </div>
  );
}