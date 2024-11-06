import React from 'react';
import './ErrorFallback.css';
import { fetchPosts, setSelected } from '../../store/redditSlice';
import { useDispatch } from 'react-redux';

const ErrorFallback = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setSelected('Home'));
        dispatch(fetchPosts('Home'));
      };

  return (
    <div className="error-fallback">
      <h3>Oops! Something went wrong.</h3>
      <p>We couldn't load the posts. Please try again.</p>
      <button onClick={handleClick} className="retry-button">Retry</button>
    </div>
  );
};

export default ErrorFallback;