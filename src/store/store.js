import { configureStore } from '@reduxjs/toolkit';
import redditReducer from './redditSlice'; // Импортируем редьюсер для работы с Reddit API

const store = configureStore({
  reducer: {
    reddit: redditReducer, // Добавляем редьюсер для работы с Reddit API
  },
});

export default store;