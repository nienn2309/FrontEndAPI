import React, { useState } from 'react';
import { createConversation } from '../../Service/api';

const CreateConversation = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [conversationName, setConversationName] = useState('');

  const handleCreateConversation = async () => {
    const ownerId = localStorage.getItem('userId');
    if (!conversationName) {
      alert('Conversation name is required');
      return;
    }

    try {
      await createConversation(conversationName, ownerId);
      setModalOpen(false);
      setConversationName('');
      alert('Conversation created successfully');
    } catch (error) {
      alert(error.message || 'An error occurred while creating the conversation');
    }
  };

  return (
    <div className="create-conversation">
      <button onClick={() => setModalOpen(true)}>Create Conversation</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              placeholder="Enter conversation name"
              value={conversationName}
              onChange={(e) => setConversationName(e.target.value)}
            />
            <button onClick={handleCreateConversation}>Create</button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateConversation;
