import React from 'react';
import './Card.css';

const Card = ({ post }) => {
  const calculatePostDate = (created) => {
    // Если значение меньше 60 — это минуты
    if (created < 60) {
      return `${created} minutes ago`;
    } 
    // Если значение меньше 24*60 — это часы
    else if (created < 24 * 60) {
      const hours = Math.floor(created / 60);
      return `${hours} hours ago`;
    } 
    // Всё, что больше — это дни
    else {
      const days = Math.floor(created / (24 * 60));
      return `${days} days ago`;
    }
  };

  const postDate = calculatePostDate(post.created);

    return (
        <div className="card">
      {/* Счётчик голосов */}
      <div className="vote-section">
        <button className="upvote">⬆</button>
        <div className="vote-count">{post.voteCount}</div>
        <button className="downvote">⬇</button>
      </div>

      {/* Секция контента */}
      <div className="post-section">
        <p className="post-text">
          {post.title}
        </p>
        <p>{post.text}</p>
        
        {post.image && post.image !== 'self' && post.image !== 'default' && (
          <img src={post.image} alt="Post visual" className="post-image" />
        )}

        {/* Информация о пользователе и комментарии */}
        <div className="comment-section">
          <div className="user-info">
          <img 
              src={post.userAvatar}
              alt="User avatar" 
              className="user-avatar"
            />
            <span className="user-name">{post.userName}</span>
            <span className="post-time">{postDate}</span>
          </div>
          <div className="comment-count">
            <span>💬</span> {post.comments}
          </div>
        </div>
      </div>
    </div>
    );
};

export default Card;