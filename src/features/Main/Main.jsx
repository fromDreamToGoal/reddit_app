import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/redditSlice';
import './Main.css';
import Card from "../Card/Card.jsx";
import CardLoading from '../Card/CardLoading.jsx';
import { AnimatedList } from 'react-animated-list';
import { getRandomInteger } from '../../utils/index.js';

const Main = () => {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector((state) => state.reddit.selectedSubreddit);
  const posts = useSelector((state) => state.reddit.posts);
  const isLoading = useSelector((state) => state.reddit.status === 'loading');
  const error = useSelector((state) => state.reddit.status === 'failed');

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  if (isLoading) {
    return <AnimatedList animation="zoom">
      {Array(getRandomInteger(2,5)).fill(<CardLoading />)}
    </AnimatedList>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-container">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Main;
