import React from 'react'
import Sidebar from '../../Components/ChatComponent/Sidebar'
import Chat from '../../Components/ChatComponent/Chat'
import './chatpagestyle.scss';
import { ConversationProvider } from '../../Components/ChatComponent/ConversationContext';

export const Chatpage = () => {
  return (
    <div className='home'>
        <div className='container'>
            <ConversationProvider>
              <Sidebar/>
              <Chat/>
            </ConversationProvider>
        </div>
    </div>
  )
}