import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ErrorFallback from '../features/ErrorFallback/ErrorFallback';
import { setSelected, fetchPosts } from '../store/redditSlice';

const mockStore = configureMockStore();
const store = mockStore({
  reddit: {
    comments: {
      '1': [] // Добавляем пустой массив комментариев для поста с id '1'
    },
    statusComments: 'idle',
  }
});

jest.mock('../store/redditSlice', () => ({
  setSelected: jest.fn((payload) => ({ type: 'reddit/setSelected', payload })),
  fetchPosts: jest.fn((payload) => ({ type: 'reddit/fetchPosts', payload })),
}));

describe('ErrorFallback', () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  test('renders ErrorFallback component', () => {
    render(
      <Provider store={store}>
        <ErrorFallback />
      </Provider>
    );

    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("We couldn't load the posts. Please try again.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });

  test('dispatches actions on button click', () => {
    render(
      <Provider store={store}>
        <ErrorFallback />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('go-home-button'));

    expect(store.dispatch).toHaveBeenCalledWith(setSelected('Home'));
    expect(store.dispatch).toHaveBeenCalledWith(fetchPosts('Home'));
  });
});