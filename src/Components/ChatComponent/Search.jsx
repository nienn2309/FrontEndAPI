import React, { useState } from 'react';
import { searchUsers } from '../../Service/api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const data = await searchUsers(query);
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
        <button hidden onClick={handleSearch}>Search</button>
      </div>
      <div className="searchResults">
        {results.map((user) => (
          <div className="userChat" key={user.userId}>
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
