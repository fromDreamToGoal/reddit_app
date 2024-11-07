import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import redditReducer from '../store/redditSlice'; // Подключите ваш редьюсер
import subredditsReducer from '../store/subRedditSlice'; // Подключите ваш редьюсер

// Настройка mock store с redux-thunk
const store = configureStore({
  reducer: {
    reddit: redditReducer,
    subreddits: subredditsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
  preloadedState: {
    reddit: {
      posts: [
        {
          id: '1',
          title: 'Test Post',
          author: 'Test Author',
          created: 1684800000,
          score: 100,
          num_comments: 10,
        },
      ],
      comments: {},
    },
    subreddits: {
      subreddits: [
        {
          id: '1',
          display_name: 'reactjs',
          description: 'A community for learning and developing web applications using React by Facebook.',
          icon_img: '',
        },
        {
          id: '2',
          display_name: 'javascript',
          description: 'A subreddit for learning and developing with JavaScript.',
          icon_img: '',
        },
      ],
    },
  },
});


describe('App', () => {
  it('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const titleElement = screen.getByRole('heading', { name: /Reddit na minimalkakh/i });
    expect(titleElement).toBeInTheDocument();
  });

});