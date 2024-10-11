import React from 'react';
import './Card.css';

const Card = ({ post }) => {
    return (
        <div className="card">
      {/* Счётчик голосов */}
      <div className="vote-section">
        <button className="upvote">⬆</button>
        <div className="vote-count">{post.ups}</div>
        <button className="downvote">⬇</button>
      </div>

      {/* Секция контента */}
      <div className="post-section">
        <p className="post-text">
          {post.title}
        </p>
        
        {post.thumbnail && post.thumbnail !== 'self' && (
          <img 
            src={post.thumbnail} 
            alt="Post visual"
            className="post-image"
          />
        )}

        {/* Информация о пользователе и комментарии */}
        <div className="comment-section">
          <div className="user-info">
          <img 
              src={`https://www.redditstatic.com/avatars/avatar_default_${post.author_flair_text || '02'}.png`} 
              alt="User avatar" 
              className="user-avatar"
            />
            <span className="user-name">{post.author}</span>
            <span className="post-time">{new Date(post.created_utc * 1000).toLocaleTimeString()}</span>
          </div>
          <div className="comment-count">
            <span>💬</span> {post.num_comments}
          </div>
        </div>
      </div>
    </div>
    );
};

export default Card;