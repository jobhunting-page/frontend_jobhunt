import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./reset.css";
import Main from "./js/Main.js";
import Login from "./js/Auth/Login.js";
import Join from "./js/Auth/Join";
import MyPage from "./js/MyPage";
import GPT from "./gpt/Index";
import Chat from "./gpt/Chat";
import Board from "./mentoring/Board";
import Test from "./js/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/gpt" element={<GPT />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
