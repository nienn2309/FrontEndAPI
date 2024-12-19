import React from 'react'

const Conversation = () => {
  return (
    <div className='chats'>
        <div className='userChat'>
            <img src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
            <div className='userChatInfo'>
                <span>Jan</span>
                <p>Hello</p>
            </div>
        </div>
        <div className='userChat'>
            <img src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
            <div className='userChatInfo'>
                <span>Jan</span>
                <p>Hello</p>
            </div>
        </div>
        <div className='userChat'>
            <img src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
            <div className='userChatInfo'>
                <span>Jan</span>
                <p>Hello</p>
            </div>
        </div>
    </div>
  )
}

export default Conversation