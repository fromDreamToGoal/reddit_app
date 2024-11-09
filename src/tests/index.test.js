import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import reportWebVitals from '../reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../store/redditSlice'; 
import subredditsReducer from '../store/subRedditSlice'; 
import '@testing-library/jest-dom';

jest.mock('../reportWebVitals', () => jest.fn());

const mockStore = configureStore({
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

describe('Root component rendering', () => {
    it('renders without crashing', () => {
        render(
            <Provider store={mockStore}>
              <App />
            </Provider>
          );
        expect(screen.getByText(/Reddit na minimalkakh/i)).toBeInTheDocument();
    });

    it('calls reportWebVitals', () => {
        render(
          <Provider store={mockStore}>
            <App />
          </Provider>
        );
        reportWebVitals();
        expect(reportWebVitals).toHaveBeenCalled();
      });
});