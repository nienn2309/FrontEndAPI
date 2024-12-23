import React from 'react';
import NavBar from './NavBar';
import Search from './Search';
import Conversation from './Conversation';
import CreateConversation from './CreateConver';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavBar />
      <Search />
      <CreateConversation />
      <Conversation />
    </div>
  );
};

export default Sidebar;
