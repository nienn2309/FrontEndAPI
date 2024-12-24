import React, { useState, useEffect } from "react";
import { useConversation } from "./ConversationContext";
import Message from "./Message";
import {
  fetchMessagesForConversation,
  subscribeToMessages,
} from "../../Service/api";

const Messages = () => {
  const { conversation } = useConversation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const getMessages = async () => {
      if (!conversation.id) return;

      try {
        const data = await fetchMessagesForConversation(conversation.id);
        setMessages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getMessages();
    subscribeToMessages(() => {
      getMessages();
    });
  }, [conversation.id]);

  if (loading) {
    return <div className="messages">Loading messages...</div>;
  }

  if (error) {
    return <div className="messages">Error: {error}</div>;
  }

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message
          key={message.messageId}
          content={message.content}
          sentAt={message.sentAt}
          isOwner={message.userId === currentUserId}
        />
      ))}
    </div>
  );
};

export default Messages;