import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search Term:', searchTerm);
    // Здесь можно будет вызвать функцию для поиска по сабреддитам
  };

  return (
    <header className="header">
      {/* Логотип и название */}
      <div className="logo-container">
        <img
          src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
          alt="Reddit Logo"
          className="logo"
        />
        <h1 className="title">Reddit na minimalkakh</h1>
      </div>

      {/* Форма для поиска */}
      <form onSubmit={handleSearchSubmit} className="form">
        <input
          type="text"
          placeholder="Search Subreddit..."
          value={searchTerm}
          onChange={handleInputChange}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;