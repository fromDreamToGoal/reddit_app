import React from 'react';
import './SubredditSkeleton.css'; // стили для анимации загрузки

export const SubredditSkeleton = () => {
  return (
    <div className="subreddits-container">
      <h3 className="subreddits-title">Subreddits</h3>
      <ul className="subreddits-list">
        {/* Создаем 5 "скелетонов" для имитации загрузки нескольких элементов */}
        {Array.from({ length: 16 }).map((_, index) => (
          <li key={index} className="subreddit-item">
            <div className="subreddit-button skeleton">
              <div className="subreddit-icon skeleton-circle"></div>
              <div className="subreddit-name skeleton-line"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};