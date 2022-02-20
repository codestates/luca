// import dotenv from "dotenv";
// require('dotenv').config();
import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Main from "./pages/main";
import Signup from "./pages/signup";
import Mypage from "./pages/mypage";
import ChangePassword from "./pages/changePassword";
import Project from "./pages/project";
import KakaoPage from "./pages/oauth/KakaoPage";
import NaverPage from "./pages/oauth/NaverPage";
import GooglePage from "./pages/oauth/GooglePage";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin } from "../src/redux/slicer/loginSlice";
import { setUserInfo } from "./redux/slicer/userInfoSlice";
import axios from "axios";
import { counterSlice } from "./redux/counterslice";
import TestMain from './pages/testMain';
import TestProject from './pages/testProject';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  console.log("App userInfo: ", userInfo);

  const isAuthenticated = () => {
    if (window.localStorage.userInfo) {
      dispatch(setIsLogin(true));
      dispatch(setUserInfo(JSON.parse(window.localStorage.userInfo)));
    } else {
      dispatch(setIsLogin(false));
      dispatch(setUserInfo(null));
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  // const { isLogin } = useSelector((state) => state.user);
  // console.log(isLogin);

  return (
    <div>
      <Routes>
        <Route path="/" element={isLogin ? <Main /> : <About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage userInfo={userInfo} />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/project" element={<Project />} />
        <Route path='/auth/callback/kakao' element={<KakaoPage userInfo={userInfo} />} />
        <Route path='/auth/callback/naver' element={<NaverPage userInfo={userInfo} />} />
        <Route path='/auth/callback/google' element={<GooglePage userInfo={userInfo} />} />
        <Route path='/test' element={<TestMain />} />
        <Route path='/test/project/1' element={<TestProject />} />
        <Route path='/test/project/2' element={<TestProject />} />
      </Routes>
    </div>
  );
}

export default App;
