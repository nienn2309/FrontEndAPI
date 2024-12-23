import React, { useState, useEffect } from 'react';
import { useConversation } from './ConversationContext';
import { fetchConversations, subscribeToMessages } from '../../Service/api';

const Conversation = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setConversation } = useConversation();

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const data = await fetchConversations(userId);
        setConversations(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();

    subscribeToMessages((user, message) => {
      loadConversations();
    });
  }, []);

  if (loading) return <div className="chats">Loading conversations...</div>;
  if (error) return <div className="chats">Error: {error.message}</div>;

  return (
    <div className="chats">
      {conversations.map((chat) => (
        <div
          key={chat.conversationId}
          className="userChat"
          onClick={() => setConversation({ id: chat.conversationId, name: chat.name })}
        >
          <img
            src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="userChatInfo">
            <span>{chat.name}</span>
            <p>Created: {new Date(chat.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conversation;