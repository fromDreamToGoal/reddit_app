import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subredditsReducer from './subRedditSlice';

const store = configureStore({
  reducer: {
    reddit: redditReducer,
    subreddits: subredditsReducer
  },
});

export default store;