import React, { useState } from 'react';
import './Header.css';
import { fetchPostsSearch } from '../../store/redditSlice';
import { useDispatch } from 'react-redux';
import { TfiAlignJustify } from "react-icons/tfi";
import { useSubredditVisibility } from '../../utils/SubredditContext.js';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { toggleVisibility } = useSubredditVisibility();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchPostsSearch({ subreddit: searchTerm })); // Передаём как параметр
    }
    console.log('Search Term:', searchTerm);
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
      <button className="button-hide" onClick={toggleVisibility}>
        <TfiAlignJustify />
      </button>
    </header>
  );
};

export default Header;