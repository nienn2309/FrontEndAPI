import React, { useState } from 'react';
import { searchUsers, createConversation, addMemberToConversation } from '../../Service/api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const currentUserId = localStorage.getItem('userId');

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const data = await searchUsers(query);
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleUserClick = async (userId) => {
    try {
      if (!currentUserId) {
        console.error('Current user ID is not available');
        return;
      }

      // Create a new conversation with the clicked user
      const conversation = await createConversation('New Conversation', currentUserId);
      console.log(conversation);

      // Add the clicked user to the conversation
      await addMemberToConversation(conversation.conversationId, userId);

      console.log(`Conversation created and user ${userId} added successfully.`);
    } catch (err) {
      console.error('Failed to create conversation or add user:', err);
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button hidden onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="searchResults">
        {results.map((user) => (
          <div
            className="userChat"
            key={user.userId}
            onClick={() => handleUserClick(user.userId)} // Handle user click to create conversation
          >
            <img
              src="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <div className="userChatInfo">
              <span>{user.username}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
