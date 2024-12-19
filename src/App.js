import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/login';
import { Chatpage } from './Pages/ChatPage/chatpage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chatpage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
