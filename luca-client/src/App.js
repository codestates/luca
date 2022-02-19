import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Main from "./pages/main";
import Signup from "./pages/signup";
import Mypage from "./pages/mypage";
import ChangePassword from "./pages/changePassword";
import Project from "./pages/project";
import KakaoPage from './pages/KakaoPage';
import NaverPage from './pages/NaverPage';
import GooglePage from './pages/GooglePage';
import TestMain from './pages/testMain';
import TestProject from './pages/testProject';


import styled from "styled-components";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={!isLogin ? <Main /> : <About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/project" element={<Project />} />
        <Route path='/auth/callback/kakao' element={<KakaoPage />} />
        <Route path='/auth/callback/naver' element={<NaverPage />} />
        <Route path='/auth/callback/google' element={<GooglePage />} />
        <Route path='/test' element={<TestMain />} />
        <Route path='/test/project/1' element={<TestProject />} />
        <Route path='/test/project/2' element={<TestProject />} />
      </Routes>
    </div>
  );
}

export default App;
