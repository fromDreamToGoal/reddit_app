import React from 'react';
import './CardLoading.css';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { TbMessageCircle } from 'react-icons/tb';

const CardLoading = () => {
  return (
    <div className="card-loading">
      {/* Счётчик голосов */}
      <div className="vote-section-loading">
        <div className="skeleton icon-skeleton"><BsHandThumbsUp /></div>
        <div className="skeleton vote-count-skeleton"></div>
        <div className="skeleton icon-skeleton"><BsHandThumbsDown /></div>
      </div>

      {/* Секция контента */}
      <div className="post-section-loading">
        <div className="post-title-skeleton skeleton"></div>
        <div className="post-text-skeleton skeleton"></div>
        
        <div className="image-placeholder-skeleton skeleton"></div>

        {/* Информация о пользователе и комментарии */}
        <div className="comment-section-loading">
          <div className="user-info-loading">
            <div className="skeleton user-icon-skeleton"></div>
            <div className="skeleton user-name-skeleton"></div>
          </div>
          <div className="post-time-skeleton skeleton"></div>
          <div className="comment-count-skeleton">
            <div className="skeleton icon-skeleton"><TbMessageCircle /></div>
            <div className="skeleton comment-count-text-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;