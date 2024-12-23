import React, { useState } from 'react';
import Plus from "../Image/plus.png";
import Messages from './Messages';
import Input from './Input';
import { useConversation } from './ConversationContext';
import { addMemberToConversation } from '../../Service/api';

const Chat = () => {
  const { conversation } = useConversation();
  const [userId, setUserId] = useState('');
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const handleAddMember = async () => {
    if (!userId) {
      alert("Please enter a user ID.");
      return;
    }

    try {
      await addMemberToConversation(conversation.id, userId);
      alert("User added successfully!");
      setUserId('');
      setIsPromptVisible(false);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to add user.");
    }
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{conversation.name}</span>
        <div
          className="chatIcons"
          onClick={() => setIsPromptVisible(!isPromptVisible)}
        >
          <img src={Plus} alt="Plus" />
        </div>
      </div>

      {isPromptVisible && (
        <div className="addMemberPrompt">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
          <button onClick={handleAddMember}>Add Member</button>
          <button onClick={() => setIsPromptVisible(false)}>Cancel</button>
        </div>
      )}

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
