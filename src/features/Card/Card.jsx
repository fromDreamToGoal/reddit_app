import React, { useState } from 'react';
import './Card.css';
import { calculatePostDate } from '../../utils/index';
import { BsHandThumbsUp,
         BsHandThumbsUpFill,
         BsHandThumbsDown,
         BsHandThumbsDownFill,
                          } from "react-icons/bs";
import { TbMessageCircle } from "react-icons/tb";

const Card = ({ post }) => {
  
  const postDate = calculatePostDate(post.created);

  // Состояние для отслеживания голосования
  const [voteStatus, setVoteStatus] = useState(null); // null, 'upvoted', 'downvoted'
  const [voteCount, setVoteCount] = useState(post.voteCount); // Начальный счетчик голосов

  // Обработка клика на кнопку "Upvote"
  const handleUpvote = () => {
    if (voteStatus === 'upvoted') {
      // Если уже проголосован "за", отменяем голос
      setVoteStatus(null);
      setVoteCount(voteCount - 1);
    } else {
      // Если голос "против" был активен, то сбрасываем его
      const adjustment = voteStatus === 'downvoted' ? 2 : 1;
      setVoteStatus('upvoted');
      setVoteCount(voteCount + adjustment);
    }
  };

  // Обработка клика на кнопку "Downvote"
  const handleDownvote = () => {
    if (voteStatus === 'downvoted') {
      // Если уже проголосован "против", отменяем голос
      setVoteStatus(null);
      setVoteCount(voteCount + 1);
    } else {
      // Если голос "за" был активен, то сбрасываем его
      const adjustment = voteStatus === 'upvoted' ? 2 : 1;
      setVoteStatus('downvoted');
      setVoteCount(voteCount - adjustment);
    }
  };

  // Определяем цвет счётчика голосов в зависимости от статуса
  const voteCountClass = voteStatus === 'upvoted' 
    ? 'vote-count upvoted' 
    : voteStatus === 'downvoted' 
    ? 'vote-count downvoted' 
    : 'vote-count';

    // Классы для кнопок
  const upvoteClass = voteStatus === 'upvoted' ? 'upvote active' : 'upvote';
  const downvoteClass = voteStatus === 'downvoted' ? 'downvote active' : 'downvote';


    return (
        <div className="card">
      {/* Счётчик голосов */}
      <div className="vote-section">
        <button className={upvoteClass} onClick={handleUpvote}>
          {voteStatus === 'upvoted' ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
        </button>
        <div className={voteCountClass}>{voteCount}</div>
        <button className={downvoteClass} onClick={handleDownvote}>
          {voteStatus === 'downvoted' ? <BsHandThumbsDownFill /> : <BsHandThumbsDown />}
        </button>
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
            src={post.userAvatar || 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'}
            onError={(e) => { e.target.src = 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png'; }} // Стандартная аватарка при ошибке
            alt="User avatar"
            className="user-avatar"
          />
            <span className="user-name">{post.userName}</span>
          </div>
          <div className="post-time">{postDate}</div>
          <div className="comment-count">
              <button className='comment-button'> <TbMessageCircle /> </button> 
              <p>{post.comments}</p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Card;