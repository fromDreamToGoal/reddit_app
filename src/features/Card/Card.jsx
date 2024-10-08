import React from 'react';
import './Card.css';

const Card = () => {
    return (
        <div className="card">
      {/* Счётчик голосов */}
      <div className="vote-section">
        <button className="upvote">⬆</button>
        <div className="vote-count">10</div>
        <button className="downvote">⬇</button>
      </div>

      {/* Секция контента */}
      <div className="post-section">
        <p className="post-text">
          Lorem ipsum egol megon käns egabelt: och prelar. Syrad sovinde bäv dirat. Kaling geotiss då res vysm.
        </p>
        
        <img 
          src="https://images.unsplash.com/photo-1719937206094-8de79c912f40?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Post visual"
          className="post-image"
        />

        {/* Информация о пользователе и комментарии */}
        <div className="comment-section">
          <div className="user-info">
            <img 
              src="https://via.placeholder.com/40" 
              alt="User avatar" 
              className="user-avatar"
            />
            <span className="user-name">Charles Etoroma</span>
            <span className="post-time">5 hours ago</span>
          </div>
          <div className="comment-count">
            <span>💬</span> 451
          </div>
        </div>
      </div>
    </div>
    );
};

export default Card;