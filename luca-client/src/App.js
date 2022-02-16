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
import axios from "axios";
const serverUrl = "http://localhost:4000";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const isAuthenticated = () => {
    if (userinfo !== null) {
      setIsLogin(true);
    }
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  const handleLogout = () => {
    axios.post(`${serverUrl}/logout`).then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      console.log(res.data.message);
    });
  };

  const testServerConnection = () => {
    // http 서버 연결 테스트용입니다.
    axios.get(serverUrl).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    testServerConnection();
    handleLogout();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={isLogin ? <Main /> : <About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/project" element={<Project />} />
        <Route path="/auth/callback/kakao" element={<KakaoPage />} />
        <Route path="/auth/callback/naver" element={<NaverPage />} />
        <Route path="/auth/callback/google" element={<GooglePage />} />
      </Routes>
    </div>
  );
}

export default App;
