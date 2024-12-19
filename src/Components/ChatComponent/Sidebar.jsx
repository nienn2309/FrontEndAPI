import React from 'react'
import NavBar from './NavBar'
import Search from './Search'
import Conversation from './Conversation'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <NavBar/>
        <Search/>
        <Conversation/>
    </div>
  )
}

export default Sidebar