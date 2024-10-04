import React from 'react';
import './Subreddits.css'; // Импорт стилей

const subreddits = [
  { name: 'Home', icon: '🏠' },
  { name: 'Railway', icon: '🚂' },
  { name: 'Politic', icon: '🏛️' },
  { name: 'Canabis', icon: '🌿' },
  { name: 'Poland', icon: '🇵🇱' },
  { name: 'Food & Drink', icon: '🍽️' },
  { name: 'Games', icon: '🎮' }
];

const Subreddits = () => {
  return (
    <div className="subreddits-container">
      <h3 className="subreddits-title">Subreddits</h3>
      <ul className="subreddits-list">
        {subreddits.map((subreddit) => (
          <li key={subreddit.name} className="subreddit-item">
            <span className="subreddit-icon">{subreddit.icon}</span>
            <span className="subreddit-name">{subreddit.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subreddits;