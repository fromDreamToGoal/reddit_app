import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Card from '../features/Card/Card';

const mockStore = configureMockStore();  //Заглушка для хранилища
const store = mockStore({
    reddit: {
        comments: {
          '1': [] // Добавляем пустой массив комментариев для поста с id '1'
        }
      }
});

test('renders post title', () => {
  // Заглушка для пропсов
  const post = {
    title: 'Test Title',
    created: 1684800000,
    author: 'Test Author',
    score: 100,
    num_comments: 10,
    comments: [],
  };

  render(
    <Provider store={store}>
      <Card post={post} />
    </Provider>
  );

  // Проверяем, что заголовок отображается
  const titleElement = screen.getByText(/Test Title/i);
  expect(titleElement).toBeInTheDocument();
});