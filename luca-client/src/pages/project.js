import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Cardboard from "../components/cardboard";
import { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setCardInfo } from '../redux/rootSlice';
import Timer from '../components/timer/Timer';

export default function Project() {
  const dispatch = useDispatch();
  const curProjectId = window.location.href.split("/".reverse()[0])
  let roomName = `project${curProjectId}`
  let userId = useSelector((state) => state.user.userInfo.id);
  let cardInfo = useSelector((state) => state.user.cardInfo);

  const socket = io.connect(`${process.env.REACT_APP_API_URL}`)
  const disconnectSocket = useCallback(() => {
    socket.on("bye", () => {
      console.log('bye')
    })
    socket.disconnect();
  }, [socket]);

  // 처음 입장할 때만 소켓 연결해준다.
  useEffect(() => {
    console.log(roomName)
    socket.emit("Enter_Room", roomName);
    socket.on("Enter_Room", (data, count) => {
      // console.log(`Number of participants: ${count}`);
      console.log("SOCKETIO connect EVENT: ", data, " client connect");
    });
    socket.emit("getCard", roomName);
    socket.on("getCard", (data) => {
      dispatch(setCardInfo(data));
      console.log(data)
    })
  }, []);

  // 뒤로 가기를 하면 소켓 연결이 끊어진다.
  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  // 카드를 추가한다.
  const addCard = () => {
    socket.emit("addCard", userId, "data", roomName);
    socket.on("addCard", (data) => {
      dispatch(setCardInfo(data));
      console.log(data);
    });
  }

  // 카드를 삭제한다.
  const deleteCard = () => {
    // const inputData = document.getElementById("data").value;
    socket.emit("deleteCard", 30, roomName);
    socket.on("deleteCard", (data) => {
      // dispatch(setCardInfo(data));
      console.log(data);
    });
  }

  return (
    <div>
      {/* <Navigator /> */}
      <Timer />
      <Canvas />
      <Cardboard />
      <button onClick={() => { addCard() }}>Add</button>
      <button onClick={() => { deleteCard() }}>Delete</button>
    </div>
  );
}
