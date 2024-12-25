import React from 'react';

const Message = ({ content, sentAt, isOwner }) => {
  return (
    <div className={`message ${isOwner ? 'owner' : ''}`}>
      <div className='messageInfo'>
        <img 
          src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="" 
        />
        <span>{new Date(sentAt).toLocaleTimeString()}</span>
      </div>
      <div className='messageContent'>
        <p dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
      </div>
    </div>
  );
};

export default Message;
