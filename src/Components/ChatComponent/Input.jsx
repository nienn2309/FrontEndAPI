import React, { useState } from 'react';
import { useConversation } from './ConversationContext';
import { sendMessageToConversation } from '../../Service/api';

const Input = () => {
  const [message, setMessage] = useState('');
  const { conversation } = useConversation();
  const userId = localStorage.getItem('userId');

  const sendMessage = async () => {
    if (!message.trim()) {
      alert('Message cannot be empty');
      return;
    }

    try {
      await sendMessageToConversation(conversation.id, userId, message);
      setMessage('');
    } catch (error) {
      alert(error.message || 'Failed to send message');
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="send">
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Input;
