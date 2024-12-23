import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <span className="logo">{username} chat</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span>{username}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};

export default NavBar;
