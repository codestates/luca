import { Navigator } from "../components/commons";
import Canvas from "../components/canvas";
import Cardboard from "../components/cardboard";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCardData } from "../redux/rootSlice";
import axios from "axios";

export default function Project() {
  //const projects = useSelector((state) => state.user.projects);
  const location = useLocation();
  const dispatch  = useDispatch();

  useEffect (async() => {
    const projectInfo = location.state.data;
    await axios.get(`${process.env.REACT_APP_API_URL}/card/${projectInfo.id}`)
    .then((res) => {
      dispatch(setCardData(res.data.data))
    })
    .catch((err) => {
      console.log(err);
    })
  }, []) // 프로젝트 엔드포인트로 들어오면 해당 아이디의 카드를 요청해서 redux state에 저장합니다.

  return (
    <div>
      <Navigator />
        <Canvas />
      <Cardboard />
    </div>
  );
}
