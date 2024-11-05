import React, { useState } from 'react';
import './Header.css';
import { fetchPostsSearch } from '../../store/redditSlice';
import { useDispatch } from 'react-redux';
import { TfiAlignJustify } from "react-icons/tfi";
import { motion } from "framer-motion";


const Header = ({ toggleSubreddits }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [isRotated, setIsRotated] = useState(false);

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

  const handleClick = () => {
    setIsRotated((prev) => !prev); // Обновляем локальное состояние для анимации
    toggleSubreddits(); // Вызываем переданную функцию для управления компонентом Subreddits
  };

  return (
    <header className="header">
      {/* Логотип и название */}
      <div className="logo-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnee_YMBs_jzSmWDkrWkreR8Uc9RS-2kTgzw&s"
          alt="Reddit Logo"
          className="logo"
        />
        <h1 className="title">Reddit na minimalkakh</h1>
      </div>

      {/* Форма для поиска */}
      <form onSubmit={handleSearchSubmit} className="form">
        <input
          type="text"
          placeholder="Enter text"
          value={searchTerm}
          onChange={handleInputChange}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <motion.div
        animate={{ rotate: isRotated ? 180 : 0 }}
        transition={{ type: "spring" }}
      >
        <button className="button-hide" onClick={handleClick}>
          <TfiAlignJustify />
        </button>
      </motion.div>
    </header>
  );
};

export default Header;