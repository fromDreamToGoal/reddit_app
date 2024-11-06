import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../../store/subRedditSlice';
import { fetchPosts, setSelected } from '../../store/redditSlice';
import './Subreddits.css';
import { useSubredditVisibility } from '../../utils/SubredditContext.js';
import { motion } from 'framer-motion';
import { SubredditSkeleton } from './SubredditSkeleton.jsx';
import { HiArrowRightCircle } from "react-icons/hi2";

const Subreddits = ({ selectedSubreddit, onSelectSubreddit, toggleSubreddits }) => {
  const dispatch = useDispatch();
  const { subreddits, loading, error } = useSelector((state) => state.subreddits);
  const { isVisible } = useSubredditVisibility();

  useEffect(() => {
    // Проверяем, есть ли уже сабреддиты в состоянии
    if (!subreddits || subreddits.length === 0) {
      dispatch(fetchSubreddits()); // Запрашиваем сабреддиты, если их нет
    }
  }, [dispatch, subreddits]);

  const handleSubredditClick = (subredditName) => {
    dispatch(setSelected(subredditName));
    onSelectSubreddit(subredditName); // Смена выбранного сабреддита
    dispatch(fetchPosts(subredditName));
    toggleSubreddits();
  };

  if(loading) {
    return <SubredditSkeleton />;
  }

  if(error) {
    return <div>Error: {error}</div>;
  }

  return (
      <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isVisible ? 0 : '100%' }}
      transition={{ duration: 0.5 }}
    >
    <div className="subreddits-container">
      <div className='subreddits-header'>
        <button onClick={toggleSubreddits} className="hide-subreddits-button">
          <HiArrowRightCircle size={24} />
        </button>
        <h2 className="subreddits-title">Subreddits</h2>
      </div>
      <ul className="subreddits-list">
        {subreddits.map((subreddit) => (
          <li key={subreddit.id} className={`subreddit-item ${selectedSubreddit === subreddit.display_name ? 'selected' : ''}`}>
            <button 
              className="subreddit-button"
              onClick={() => handleSubredditClick(subreddit.display_name)}
            >
            <img src={
                  subreddit.icon_img ||
                  `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                } 
                alt={`${subreddit.display_name} icon`} 
                className='subreddit-icon'/>
              {subreddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
    </motion.div>
  );
};

export default Subreddits;