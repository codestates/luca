import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Canvas2 from "../components/canvas2";
import Canvas3 from "../components/canvas3";
import Cardboard from "../components/cardboard";
import { useEffect, useCallback, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  setCardList,
  setMindmapTree,
  setMindmapHistory,
  setBlockData,
  setTimerTimeOn,
  setTimerSettings
} from "../redux/rootSlice";

export default function Project() {
  const socket = io.connect(`${process.env.REACT_APP_API_URL}`);
  const curProjectId = window.location.href.split("/").reverse()[0];
  const roomName = `${curProjectId}`;

  const dispatch = useDispatch();

  const [time, setTime] = useState(0);
  const [dragItemId, setDragItemId] = useState(null);
  const userId = useSelector((state) => state.user.userInfo.id);
  const timerSettings = useSelector((state) => state.user.timerSettings);

  const disconnectSocket = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  // 처음 입장할 때만 소켓 연결해준다.
  useEffect(() => {
    socket.emit("enterRoom", roomName);
    socket.emit("initData", roomName);
  }, []);

  useEffect(() => {
    return () => {
      disconnectSocket();
      // window.location.reload();
    };
  }, []);

  const createCard = (newCardContent, color) => {
    socket.emit("createCard", userId, newCardContent, color, roomName);
  };

  const deleteCard = (id) => {
    socket.emit("deleteCard", id, roomName);
  };

  const mouseDown = (id) => {
    socket.emit("editBlockStart", { cardId: Number(id), isBlock: true }, roomName);
  };
  const mouseUp = (id) => {
    socket.emit("editBlockEnd", { cardId: Number(id), isBlock: false }, roomName);
  };

  const addMindmapHandler = (id) => {
    socket.emit("addMindmap", { cardId: dragItemId, parentId: id }, roomName);
  };

  const deleteMindmapHandler = (e, id) => {
    e.stopPropagation();
    socket.emit("deleteMindmap", { cardId: id }, roomName);
  };

  const timerHandler = (timeEventName) => {
    if(timeEventName === "increaseTime") {
      socket.emit("increaseTime", time, roomName);
    }

    if(timeEventName === "decreaseTime") {
      socket.emit("decreaseTime", time, roomName);
    }

    if(timeEventName === "clickTimer") {
      socket.emit("clickTimer", true, roomName);
    }

    if(timeEventName === "startTimer") {
      socket.emit("startTimer", true, roomName);
    }

    if(timeEventName === "pauseTimer") {
      socket.emit("pauseTimer", false, roomName);
    }

    if(timeEventName === "resetTimer") {
      setTime(0);
      socket.emit("resetTimer", false, roomName);
    }
  }

  // 배열이 업데이트될 때마다 계속해서 추가로 리스너가 등록되는 것을 방지하기 위해 useEffect 사용)
  useEffect(() => {
    socket.on("enterRoom", (data, count) => {
      // console.log(`Number of participants: ${count}`);
      console.log("SOCKETIO connect EVENT: ", data, " client connect");
    });

    socket.on("initData", (cardInfo, mindmapInfo) => {
      dispatch(setCardList(cardInfo));
      dispatch(setMindmapTree(mindmapInfo));
    });

    socket.on("createCard", (data) => {
      dispatch(setCardList(data));
    });
    
    socket.on("deleteCard", (data) => {
      dispatch(setCardList(data));
    });

    socket.on("editBlockStart", (data) => {
      dispatch(setBlockData(data));
    });

    socket.on("editBlockEnd", (data) => {
      dispatch(setBlockData(data));
    });

    socket.on("addMindmap", (cardInfo, mindmapInfo) => {
      dispatch(setCardList(cardInfo));
      dispatch(setMindmapTree(mindmapInfo));
    });

    socket.on("deleteMindmap", (cardInfo, mindmapInfo) => {
      dispatch(setCardList(cardInfo));
      dispatch(setMindmapTree(mindmapInfo));
    });

    socket.on("increaseTime", (data) => {
      setTime(data + 300);
    });

    socket.on("decreaseTime", (data) => {
      setTime(data - 300);
    });

    socket.on("clickTimer", (data) => {
      dispatch(setTimerSettings(data));
    });

    socket.on("startTimer", (data) => {
      dispatch(setTimerTimeOn(data));
    });

    socket.on("pauseTimer", (data) => {
      dispatch(setTimerTimeOn(data));
    });

    socket.on("resetTimer", (data) => {
      dispatch(setTimerSettings(data));
      setTime(0);
    });
  }, []);

  return (
    <div>
      {/* <Navigator /> */}
      <Canvas3
        addMindmapHandler={addMindmapHandler}
        deleteMindmapHandler={deleteMindmapHandler}
        timerHandler={timerHandler}
        time={time}
        setTime={setTime}
      />
      <Cardboard
        createCard={createCard}
        deleteCard={deleteCard}
        addMindmapHandler={addMindmapHandler}
        setDragItemId={setDragItemId}
        mouseDown={mouseDown}
        mouseUp={mouseUp}
      />
    </div>
  );
}
