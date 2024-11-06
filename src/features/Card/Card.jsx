import React, { useState } from 'react';
import './Card.css';
import { calculatePostDate } from '../../utils/index';
import { BsHandThumbsUp,
         BsHandThumbsUpFill,
         BsHandThumbsDown,
         BsHandThumbsDownFill,
                          } from "react-icons/bs";
import { TbMessageCircle, TbMessageCircleFilled } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { getRandomAvatar } from '../../utils/index';
import CommentSkeleton from './CommentSkeleton';

const Card = ({ post, subreddit, onFetchComments }) => {
  const postDate = calculatePostDate(post.created); // Вычисляем дату публикации
  const [voteStatus, setVoteStatus] = useState(null); // null, 'upvoted', 'downvoted'
  const [voteCount, setVoteCount] = useState(post.voteCount); // Начальный счетчик голосов
  const comments = useSelector((state) => state.reddit.comments[post.id]) || [];
  const [showComments, setShowComments] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Добавляем состояние для отслеживания клика на кнопке коментария
  const isLoading = useSelector((state) => state.reddit.statusComments === 'loading');

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

    // Обработка клика на кнопку "Load Comments"
    const handleLoadComments = () => {
      if (!comments.length) {
        onFetchComments(subreddit, post.id); // Теперь передаём `subreddit` и `post.id`
      }
      setShowComments(!showComments);
    };

    const toggleCommentButton = () => {
      setIsClicked((prev) => !prev);
      handleLoadComments();
    };
  

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
        <p className="post-title">
          {post.title}
        </p>
        <p className='post-text'>{post.text || post.selftext}</p>
        
        {post.image && post.image !== 'self' && post.image !== 'default' && (
          <img src={post.image} alt="Post visual" className="post-image" />
        )}

        {/* Информация о пользователе и комментарии */}
        <div className="comment-section">
          <div className="post-info">
            <div className="user-info">
            <img 
              src={getRandomAvatar()} // Случайная аватарка по умолчанию
              onError={(e) => { e.target.src = getRandomAvatar(); }} // Стандартная аватарка при ошибке
              alt="User avatar"
              className="user-avatar"
            />
              <span className="user-name">{post.userName}</span>
            </div>
            <div className="post-time">{postDate}</div>
            <div className="comment-count">
             <button 
                className={`comment-button ${isClicked ? 'clicked' : ''}`}
                onClick={toggleCommentButton}
             >
                {isClicked ? <TbMessageCircleFilled /> : <TbMessageCircle />} {post.comments}
              </button>
            </div>
          </div>
          {showComments && (
            <div className="comments-list">
              { isLoading ? (
                <>
                  <CommentSkeleton />
                  <CommentSkeleton />
                  <CommentSkeleton />
                </> 
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="comment" id='box'>
                      <div className="comment-author">{comment.author}</div>
                      <div className="comment-body">{comment.body}</div>
                      <div className="comment-date">{calculatePostDate(comment.created)}</div>
                    </div>
                  ))
                )}
            </div>
          )}
        </div>
      </div>
    </div>
    );
};

export default Card;