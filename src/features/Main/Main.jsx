import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchComments } from '../../store/redditSlice';
import './Main.css';
import Card from "../Card/Card.jsx";
import CardLoading from '../Card/CardLoading.jsx';
import { getRandomInteger } from '../../utils/index.js';
import { motion } from 'framer-motion';

const Main = () => {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.reddit.selectedSubreddit);
  const posts = useSelector((state) => state.reddit.posts);
  const isLoading = useSelector((state) => state.reddit.status === 'loading');
  const error = useSelector((state) => state.reddit.status === 'failed');

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const handleFetchComments = (subreddit, postId) => {
    dispatch(fetchComments({ subreddit, postId }));
  };

  if (isLoading) {
    return (
      <div className='main'>
        {Array.from({ length: getRandomInteger(2, 5) }, (_, index) => (
          <motion.div key={index} initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01]
          }}>
            <CardLoading />
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-container">
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <Card 
            key={post.id} 
            post={post} 
            subreddit={selectedSubreddit} 
            onFetchComments={handleFetchComments}
          />
        ))
      ) : (
        <div>No posts available</div> // Сообщение, если постов нет или они не загрузились
      )}
    </div>
  );
}

export default Main;
