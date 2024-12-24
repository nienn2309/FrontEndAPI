import React, { useState, useEffect } from "react";
import { useConversation } from "./ConversationContext";
import {
  fetchConversations,
  subscribeToNewConversations,
  joinConversationGroup,
  leaveConversationGroup,
} from "../../Service/api";

const Conversation = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const { setConversation } = useConversation();

  useEffect(() => {
    let isSubscribed = true;
  
    const loadConversations = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await fetchConversations(userId);
        if (isSubscribed) setConversations(data);
      } catch (err) {
        setError(err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };
  
    loadConversations();
  
    subscribeToNewConversations(() => {
      loadConversations();
    });
  
    return () => {
      isSubscribed = false;
    };
  }, []);
  

  const handleConversationClick = async (chat) => {
    try {
      if (activeConversationId) {
        await leaveConversationGroup(activeConversationId);
      }

      setConversation({ id: chat.conversationId, name: chat.name });
      await joinConversationGroup(chat.conversationId);

      setActiveConversationId(chat.conversationId);
    } catch (err) {
      console.error("Error switching conversation group:", err);
    }
  };

  if (loading) return <div className="chats">Loading conversations...</div>;
  if (error) return <div className="chats">Error: {error.message}</div>;

  return (
    <div className="chats">
      {conversations.map((chat) => (
        <div
          key={chat.conversationId}
          className={`userChat ${chat.conversationId === activeConversationId ? "active" : ""}`}
          onClick={() => handleConversationClick(chat)}
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
