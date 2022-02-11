import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Main from "./pages/main";
import Signup from "./pages/signup";
import Mypage from "./pages/mypage";
import ChangePassword from "./pages/changePassword";
import Project from "./pages/project";

import styled from "styled-components";
import { useState } from "react";

const Navigator = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: cyan;
  text-align: center;
`;

const Backdrop = styled.div`
  width: 100vw;
  min-height: 90vh;
  height: auto;
  background-color: grey;
  justify-content: center;
  display: flex;
`;

const Container = styled.div`
  min-height: 90vh;
  height: auto;
  background-color: lightyellow;
  flex: 1 0 auto;
  max-width: 1320px;
  margin: auto;
`;

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <Navigator>this is Navigator</Navigator>
      <Backdrop>
        <Container>
          <Routes>
            <Route path="/" element={isLogin ? <Main /> : <About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/project" element={<Project />} />
          </Routes>
        </Container>
      </Backdrop>
    </div>
  );
}

export default App;
