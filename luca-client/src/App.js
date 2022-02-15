import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Main from "./pages/main";
import Signup from "./pages/signup";
import Mypage from "./pages/mypage";
import ChangePassword from "./pages/changePassword";
import Project from "./pages/project";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/" element={isLogin ? <Main /> : <About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
