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
import LoginLoading from "./pages/loginLoading"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin, setUserInfo } from "../src/redux/rootSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/profile`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((data) => {
        dispatch(setUserInfo(data.data.data));
        dispatch(setIsLogin(true));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(setIsLogin(false));
          dispatch(
            setUserInfo({
              id: "",
              email: "",
              name: "",
              isGuest: "",
              isSocial: "",
              createdAt: "",
              updatedAt: "",
            })
          );
        }
      });
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <div>
      <Routes>
        <Route path="/" element={isLogin ? <LoginLoading /> : <About />} />
        <Route path="/main" element={ <Main />} />
        <Route path="/loginloading" component={<LoginLoading />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/project/*" element={<Project />} />
        <Route path="/auth/callback/kakao" element={<KakaoPage />} />
        <Route path="/auth/callback/naver" element={<NaverPage />} />
        <Route path="/auth/callback/google" element={<GooglePage />} />
      </Routes>
    </div>
  );
}

export default App;
