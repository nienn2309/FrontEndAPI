import React from 'react'

const NavBar = () => {
  return (
    <div className='navbar'>
        <span className="logo">Nguyen Chat</span>
        <div className='user'>
            <img src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
            <span>Nguyen</span>
            <button>logout</button>
        </div>
    </div>
  )
}

export default NavBar