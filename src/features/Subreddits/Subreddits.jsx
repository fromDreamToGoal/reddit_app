import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../../store/subRedditSlice';
import { fetchPosts } from '../../store/redditSlice';
import './Subreddits.css';

const Subreddits = () => {
  const dispatch = useDispatch();
  const { subreddits, loading, error } = useSelector((state) => state.subreddits);
  const [selectedSubreddit, setSelectedSubreddit] = useState(null);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleSubredditClick = (subredditName) => {
    setSelectedSubreddit(subredditName);
    dispatch(fetchPosts(subredditName));
  };

  if(loading) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="subreddits-container">
      <h3 className="subreddits-title">Subreddits</h3>
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
  );
};

export default Subreddits;