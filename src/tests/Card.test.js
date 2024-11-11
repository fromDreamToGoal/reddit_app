import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Card from '../features/Card/Card';


const mockStore = configureMockStore();  //Заглушка для хранилища

const store = mockStore({
    reddit: {
        comments: {
          '1': [] // Добавляем пустой массив комментариев для поста с id '1'
        },
        statusComments: 'idle',
      }
});


describe('Card component', () => {
  const post = {
      id: '1',
      title: 'Test Post',
      text: 'This is a test post',
      created: new Date().getTime(),
      voteCount: 10,
      userName: 'test_user',
      comments: 5,
  };

  const subreddit = 'test_subreddit';
  const onFetchComments = jest.fn();

  test('should handle upvote correctly when downvoted', () => {
    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );

    const upvoteButton = screen.getByTestId('upvote-button');
    const downvoteButton = screen.getByTestId('downvote-button');
    const voteCount = screen.getByText('10');

    fireEvent.click(downvoteButton);
    fireEvent.click(upvoteButton);

    expect(voteCount).toHaveTextContent('11');
  });

  test('should handle upvote and downvote correctly', () => {
    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );

    const upvoteButton = screen.getByTestId('upvote-button');
    const downvoteButton = screen.getByTestId('downvote-button');
    const voteCount = screen.getByTestId('vote-count');

    // Initial vote count
    expect(voteCount).toHaveTextContent('10');

    // Upvote the post
    fireEvent.click(upvoteButton);
    expect(voteCount).toHaveTextContent('11');

    // Cancel upvote
    fireEvent.click(upvoteButton);
    expect(voteCount).toHaveTextContent('10');

    // Downvote the post
    fireEvent.click(downvoteButton);
    expect(voteCount).toHaveTextContent('9');

    // Cancel downvote
    fireEvent.click(downvoteButton);
    expect(voteCount).toHaveTextContent('10');
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

  test('should handle downvote correctly when upvoted', () => {
    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );

    const upvoteButton = screen.getByTestId('upvote-button');
    const downvoteButton = screen.getByTestId('downvote-button');
    const voteCount = screen.getByText('10');

    // Нажимаем кнопку upvote, чтобы голос был "за"
    fireEvent.click(upvoteButton);
    expect(voteCount).toHaveTextContent('11');

    // Нажимаем кнопку downvote после upvote
    fireEvent.click(downvoteButton);
    expect(voteCount).toHaveTextContent('9'); // voteCount уменьшается на 2, т.к. голос "за" был сброшен и изменился на "против"
  });


  test('should handle downvote correctly when not voted', () => {
    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );

    const downvoteButton = screen.getByTestId('downvote-button');
    const voteCount = screen.getByText('10');

    // Нажимаем кнопку downvote, когда нет активного голоса
    fireEvent.click(downvoteButton);
    expect(voteCount).toHaveTextContent('9'); // voteCount уменьшается на 1
  });

  test('should cancel downvote when downvoted again', () => {
    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );

    const downvoteButton = screen.getByTestId('downvote-button');
    const voteCount = screen.getByText('10');

    // Нажимаем кнопку downvote, чтобы проголосовать "против"
    fireEvent.click(downvoteButton);
    expect(voteCount).toHaveTextContent('9');

    // Нажимаем кнопку downvote ещё раз, чтобы отменить голос "против"
    fireEvent.click(downvoteButton);
    expect(voteCount).toHaveTextContent('10'); // voteCount возвращается к исходному значению
  });

  test('should load comments if not already loaded', () => {
    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );

    const commentButton = screen.getByTestId('comment-button');

    // Нажимаем на кнопку комментариев
    fireEvent.click(commentButton);

    // Проверяем, что `onFetchComments` был вызван, так как комментариев нет
    expect(onFetchComments).toHaveBeenCalledWith(subreddit, post.id);
  });

  test('should not load comments if already loaded', () => {
    // Обновляем состояние хранилища так, чтобы у поста уже были комментарии
    store.getState().reddit.comments[post.id] = [
      { id: 'comment1', body: 'Existing comment' },
    ];

    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );

    const commentButton = screen.getByTestId('comment-button');

    // Нажимаем на кнопку комментариев
    fireEvent.click(commentButton);

    // Проверяем, что `onFetchComments` НЕ был вызван, так как комментарии уже загружены
    expect(onFetchComments).not.toHaveBeenCalled();
  });

  test('should toggle comment visibility on button click', () => {
    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );

    const commentButton = screen.getByTestId('comment-button');
    const commentsSection = () => screen.queryByTestId('comments-section'); // Предполагаем, что comments-section существует, если комментарии отображаются

    // Вначале комментарии не отображаются
    expect(commentsSection()).not.toBeInTheDocument();

    // Нажимаем кнопку, чтобы показать комментарии
    fireEvent.click(commentButton);
    expect(commentsSection()).toBeInTheDocument(); // Комментарии отображаются

    // Нажимаем кнопку ещё раз, чтобы скрыть комментарии
    fireEvent.click(commentButton);
    expect(commentsSection()).not.toBeInTheDocument(); // Комментарии скрываются
  });
  test('should handle upvote and downvote correctly', () => {
    render(
      <Provider store={store}>
        <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
      </Provider>
    );
      
      const upvoteButton = screen.getByTestId('upvote-button');
      const downvoteButton = screen.getByTestId('downvote-button');
      const voteCount = screen.getByTestId('vote-count');
      
      // Нажимаем кнопку upvote
      fireEvent.click(upvoteButton);
      expect(voteCount).toHaveTextContent('11');
  
      // Нажимаем кнопку downvote
      fireEvent.click(downvoteButton);
      expect(voteCount).toHaveTextContent('9');
  
      // Нажимаем кнопку upvote
      fireEvent.click(upvoteButton);
      expect(voteCount).toHaveTextContent('11');
    });
    test('should toggle comments visibility correctly', () => {
      render(
        <Provider store={store}>
          <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
        </Provider>
      );
      const commentButton = screen.getByTestId('comment-button');

      // Initially comments should not be visible
      expect(screen.queryByTestId('comments-section')).toBeNull();

      // Click to show comments
      fireEvent.click(commentButton);
      expect(screen.queryByTestId('comments-section')).not.toBeNull();

      // Click again to hide comments
      fireEvent.click(commentButton);
      expect(screen.queryByTestId('comments-section')).toBeNull();
  });
  test('should render post image if post.image is valid', () => {
    post.image = 'https://example.com/image.jpg';

    const { getByAltText } = render(
        <Provider store={store}>
            <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
        </Provider>
    );

    const postImage = getByAltText('Post visual');
    expect(postImage).toBeInTheDocument();
    expect(postImage).toHaveAttribute('src', 'https://example.com/image.jpg');
});

test('should not render post image if post.image is "self" or "default"', () => {
    post.image = 'self';

    const { queryByAltText } = render(
        <Provider store={store}>
            <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
        </Provider>
    );

    expect(queryByAltText('Post visual')).toBeNull();

    post.image = 'default';

    const { queryByAltText: queryByAltTextDefault } = render(
        <Provider store={store}>
            <Card post={post} subreddit={subreddit} onFetchComments={onFetchComments} />
        </Provider>
    );

    expect(queryByAltTextDefault('Post visual')).toBeNull();
});
test('renders CommentSkeletons when comments are loading', () => {
  // Настройка начального состояния стора
  const store = mockStore({
    reddit: {
        comments: {
          '1': [] // Добавляем пустой массив комментариев для поста с id '1'
        },
        statusComments: 'loading',
      }
  });

  // Рендерим компонент с мокированным Redux-сотором
  render(
    <Provider store={store}>
      <Card post={post} subreddit="test-subreddit" onFetchComments={() => {}} />
    </Provider>
  );

  // Находим кнопку для загрузки комментариев и кликаем по ней
  const commentButton = screen.getByTestId('comment-button');
  fireEvent.click(commentButton);

  // Проверяем, что отображаются три скелетона комментариев
  const skeletons = screen.getAllByTestId('comment-skeleton');
  expect(skeletons).toHaveLength(3);
});
});

