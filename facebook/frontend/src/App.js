import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

import Login from './view/Login';
import Home from './view/Home';
import Regist from './view/Regist';
import Identify from './view/Identify';
import DeleteUser from './view/DeleteUser';
import Video from './view/Video';
import People from './view/People';
import Game from './view/Game';
import Board from './view/Board';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">로그인</Link>
        <Link to="/home">홈</Link>
        <Link to="/regist">사용자 등록</Link>
        <Link to="/identify">사용자 찾기</Link>
        <Link to="/deleteuser">회원탈퇴</Link>
        <Link to="/board">게시판</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/video" element={<Video />}></Route>
          <Route path="/people" element={<People />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/regist" element={<Regist />}></Route>
          <Route path="/identify" element={<Identify />}></Route>
          <Route path="/deleteuser" element={<DeleteUser />}></Route>
          <Route path="/board" element={<Board />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
