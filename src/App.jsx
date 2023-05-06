import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./reset.css"
import Main from './js/Main.jsx';
import Login from './js/Auth/Login.jsx'
import Join from './js/Auth/Join.jsx';
import MyPage from './js/MyPage.jsx';
import GlobalStyles from './style/GlobalFont';
import Chat from './gpt/Chat';
import Board from './mentoring/Board';


function App() {


  return (
    <BrowserRouter>
    <GlobalStyles/>
      <Routes>
        <Route path = '/' element = {<Main/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/join' element={<Join />}/>
        <Route path='/myPage' element={<MyPage />}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/board' element={<Board/>}/>
      </Routes>
    </BrowserRouter>
  );
}




export default App;