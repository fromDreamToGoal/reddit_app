import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../../store/subRedditSlice';
import { fetchPosts, setSelected } from '../../store/redditSlice';
import './Subreddits.css';
import { useSubredditVisibility } from '../../utils/SubredditContext.js';

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
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`subreddits ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        transition: 'transform 0.3s ease',
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)'
      }}
>
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
</div>
  );
};

export default Subreddits;