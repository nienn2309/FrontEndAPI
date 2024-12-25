import React, { useState, useEffect } from "react";
import { useConversation } from "./ConversationContext";
import {
  fetchConversations,
  subscribeToNewConversations,
  subscribeToConversationTimeUpdates,
  joinConversationGroup,
  leaveConversationGroup,
} from "../../Service/api";

const Conversation = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [recentlyUpdated, setRecentlyUpdated] = useState(new Set());
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

    subscribeToConversationTimeUpdates((conversationId, newTime) => {
      if (isSubscribed) {
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.conversationId === conversationId 
              ? { ...conv, currentMessageTime: newTime }
              : conv
          )
        );
        // Only add to recentlyUpdated if it's not the active conversation
        if (conversationId !== activeConversationId) {
          setRecentlyUpdated(prev => new Set([...prev, conversationId]));
        }
      }
    });
  
    return () => {
      isSubscribed = false;
    };
  }, [activeConversationId]); // Added activeConversationId to dependency array
  
  const handleConversationClick = async (chat) => {
    try {
      if (activeConversationId) {
        await leaveConversationGroup(activeConversationId);
      }

      setConversation({ id: chat.conversationId, name: chat.name });
      await joinConversationGroup(chat.conversationId);

      setActiveConversationId(chat.conversationId);
      
      // Remove the conversation from recently updated when clicked
      setRecentlyUpdated(prev => {
        const newSet = new Set(prev);
        newSet.delete(chat.conversationId);
        return newSet;
      });
    } catch (err) {
      console.error("Error switching conversation group:", err);
    }
  };

  if (loading) return <div className="chats">Loading conversations...</div>;
  if (error) return <div className="chats">Error: {error.message}</div>;

  return (
    <div className="chats">
      {conversations
        .slice()
        .sort((a, b) => new Date(b.currentMessageTime) - new Date(a.currentMessageTime))
        .map((chat) => (
          <div
            key={chat.conversationId}
            className={`userChat ${chat.conversationId === activeConversationId ? "active" : ""}`}
            onClick={() => handleConversationClick(chat)}
          >
            <img
              src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <div 
              className="userChatInfo"
              style={{
                color: (recentlyUpdated.has(chat.conversationId) && 
                       chat.conversationId !== activeConversationId) ? 'red' : 'inherit'
              }}
            >
              <span>{chat.name}</span>
              <p>{new Date(chat.currentMessageTime).toLocaleString()}</p>
            </div>
          </div>
        ))}
    </div>
  );  
};

export default Conversation;