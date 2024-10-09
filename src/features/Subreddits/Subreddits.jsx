import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from '../../store/subRedditSlice';
import './Subreddits.css'; // Импорт стилей

const Subreddits = () => {
  const dispatch = useDispatch();
  const { subreddits, loading, error } = useSelector((state) => state.subreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

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
          <li key={subreddit.id} className="subreddit-item">
            <button className="subreddit-button">
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