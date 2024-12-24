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
      await sendMessageToConversation(conversation.id, userId, message.trim());
      setMessage('');
    } catch (error) {
      alert(error.message || 'Failed to send message');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="input">
      <textarea
        placeholder="Type something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        rows="3"
      />
      <div className="send">
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Input;