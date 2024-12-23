import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './Pages/Login/login';
import { Chatpage } from './Pages/ChatPage/chatpage';
import { initializeSignalR, subscribeToMessages, signalRConnection } from './Service/api';

function App() {
  useEffect(() => {
    initializeSignalR();
    subscribeToMessages((user, message) => {
      console.log(`${user}: ${message}`);
    });

    return () => {
      signalRConnection.stop();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Chatpage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;