import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Cardboard from "../components/cardboard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import { setCardList } from "../redux/rootSlice";

export default function Project() {
  const dispatch = useDispatch();
  const cardList = useSelector((state) => state.user.cardList);
  const curProjectId = useSelector((state) => state.user.curProjectId);
  const userInfo = useSelector((state) => state.user.userInfo);
  const roomName = `project${curProjectId}`;
  const socket = io.connect(`${process.env.REACT_APP_API_URL}`)

  const disconnectSocket = useCallback(() => {
      socket.on("bye", () => {
          console.log('bye')
      })
      socket.disconnect();
  }, [socket]);

  useEffect(() => {
    socket.emit("enterRoom", roomName, curProjectId);
  }, []);
  
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  const addCardHandler = () => {
    socket.emit("createCard", { 
      userId: userInfo.id,
      projectId: curProjectId,
      content: "addCardHandler test"
    }, roomName);
  }

  socket.on("new_disconnect", function (data) {
    console.log("SOCKETIO disconnect EVENT: ", data, " client connect");
  });

  socket.on("enterRoom", (data, count) => {
    console.log(`Number of participants: ${count}`);
    console.log("SOCKETIO connect EVENT: ", data, " client connect");
  })

  socket.on("createCard", (data) => {
    dispatch(setCardList([...cardList, data]));
  })

  socket.on("initData", (data1, data2) => {
    console.log(data1);
    dispatch(setCardList(data2));
  })

  return (
    <div>
          {console.log(curProjectId)}
      <Navigator />
      <Canvas />
      <Cardboard addCardHandler={addCardHandler} />
    </div>
  );
}
