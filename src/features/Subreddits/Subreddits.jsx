import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../../store/subRedditSlice';
import { fetchPosts, setSelected } from '../../store/redditSlice';
import './Subreddits.css';
import { useSubredditVisibility } from '../../utils/SubredditContext.js';
import { motion } from 'framer-motion';
import { SubredditSkeleton } from './SubredditSkeleton.jsx';

const Subreddits = () => {
  const dispatch = useDispatch();
  const { subreddits, loading, error } = useSelector((state) => state.subreddits);
  const [selectedSubreddit, setSelectedSubreddit] = useState(null);
  const { isVisible } = useSubredditVisibility();

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleSubredditClick = (subredditName) => {
    dispatch(setSelected(subredditName));
    setSelectedSubreddit(subredditName);
    dispatch(fetchPosts(subredditName));
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
      <h2 className="subreddits-title">Subreddits</h2>
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