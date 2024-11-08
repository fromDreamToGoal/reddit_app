import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import redditReducer from '../store/redditSlice'; 
import subredditsReducer from '../store/subRedditSlice'; 

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
  it('toggles isSunbredditsVisible', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const buttonElement = screen.getByTestId('button-hide');
    expect(buttonElement).toBeInTheDocument();
    buttonElement.click();
    const subredditsElement = screen.getByText(/reactjs/i);
    expect(subredditsElement).toBeInTheDocument();
  });
});

describe('App component', () => {
  beforeEach(() => {
    global.innerWidth = 640;
    global.dispatchEvent(new Event('resize'));
  });

  it('hides subreddits container on small screens on initial render', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Проверяем, что контейнер сабреддитов отсутствует
    const subredditsElement = screen.queryByText(/reactjs/i);
    expect(subredditsElement).not.toBeInTheDocument();
  });
});