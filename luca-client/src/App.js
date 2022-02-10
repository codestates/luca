import "./App.css";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./pages/main";
import Mypage from "./pages/mypage";
import Signup from "./pages/signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;
