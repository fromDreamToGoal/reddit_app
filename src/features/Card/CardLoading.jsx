import React from 'react';
import './CardLoading.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BsHandThumbsUp,
         BsHandThumbsDown 
                   } from "react-icons/bs";


const CardLoading = () => {
  
      return (
          <div className="card-loading">
        {/* Счётчик голосов */}
        <div className="vote-section-loading">
          <button className="upvote-loading"><BsHandThumbsUp /></button>
          <div className="vote-count-loading"> <Skeleton width={30} /></div>
          <button className="downvote-loading"><BsHandThumbsDown /></button>
        </div>
  
        {/* Секция контента */}
        <div className="post-section-loading">
          <p className="post-text-loading">
            <Skeleton />
          </p>
          <p><Skeleton /></p>
          
          <Skeleton height={250} />
  
          {/* Информация о пользователе и комментарии */}
          <div className="comment-section-loading">
            <div className="user-info-loading">
            <Skeleton />
              <span className="user-name-loading"><Skeleton /></span>
              <span className="post-time-loading"><Skeleton /></span>
            </div>
            <div className="comment-count-loading">
              <span>💬</span> <Skeleton />
            </div>
          </div>
        </div>
      </div>
      );
  };

export default CardLoading;