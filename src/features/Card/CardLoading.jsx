import React from 'react';
import './CardLoading.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const CardLoading = () => {
  
      return (
          <div className="card">
        {/* Счётчик голосов */}
        <div className="vote-section">
          <button className="upvote">⬆</button>
          <div className="vote-count"> <Skeleton width={30} /></div>
          <button className="downvote">⬇</button>
        </div>
  
        {/* Секция контента */}
        <div className="post-section">
          <p className="post-text">
            <Skeleton />
          </p>
          <p><Skeleton /></p>
          
          <Skeleton height={250} />
  
          {/* Информация о пользователе и комментарии */}
          <div className="comment-section">
            <div className="user-info">
            <Skeleton />
              <span className="user-name"><Skeleton /></span>
              <span className="post-time"><Skeleton /></span>
            </div>
            <div className="comment-count">
              <span>💬</span> <Skeleton />
            </div>
          </div>
        </div>
      </div>
      );
  };

export default CardLoading;