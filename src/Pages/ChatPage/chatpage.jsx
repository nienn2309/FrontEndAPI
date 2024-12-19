import React from 'react'
import Sidebar from '../../Components/ChatComponent/Sidebar'
import Chat from '../../Components/ChatComponent/Chat'
import './chatpagestyle.scss';

export const Chatpage = () => {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}
