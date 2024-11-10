import { fetchPostComments, fetchSubredditPosts } from '../api/reddit';

const BASE_URL = 'https://www.reddit.com';

global.fetch = jest.fn();

describe('fetchPostComments', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should fetch comments for a given post', async () => {
    // Устанавливаем мок-данные, имитирующие ответ от API
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {},
          {
            data: {
              children: [
                {
                  data: {
                    id: 'comment1',
                    body: 'This is a comment',
                    author: 'user1',
                    created_utc: 1618317047,
                    score: 10,
                  },
                },
                {
                  data: {
                    id: 'comment2',
                    body: 'Another comment',
                    author: 'user2',
                    created_utc: 1618317050,
                    score: 5,
                  },
                },
              ],
            },
          },
        ]),
      })
    );

    const subreddit = 'javascript';
    const postId = 'post1';
    const comments = await fetchPostComments(subreddit, postId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/r/${subreddit}/comments/${postId}.json`);
    expect(comments).toEqual([
      {
        id: 'comment1',
        body: 'This is a comment',
        author: 'user1',
        created: 1618317047,
        score: 10,
      },
      {
        id: 'comment2',
        body: 'Another comment',
        author: 'user2',
        created: 1618317050,
        score: 5,
      },
    ]);
  });

  it('should return an empty array if the response structure is invalid', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{}]),
      })
    );

    const subreddit = 'javascript';
    const postId = 'post1';
    const comments = await fetchPostComments(subreddit, postId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(comments).toEqual([]);
  });

  it('should log an error and return an empty array if fetching comments fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));

    const subreddit = 'javascript';
    const postId = 'post1';
    const comments = await fetchPostComments(subreddit, postId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(comments).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch comments:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});

describe('fetchSubredditPosts', () => {
    beforeEach(() => {
      fetch.mockClear();
    });
  
    it('should fetch posts for a given subreddit', async () => {
      // Мок-данные для успешного ответа API
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: {
              children: [
                {
                  data: {
                    id: 'post1',
                    title: 'First post',
                    selftext: 'This is the first post',
                    preview: {
                      images: [
                        {
                          source: {
                            url: 'https://example.com/image1.jpg',
                          },
                        },
                      ],
                    },
                    ups: 123,
                    author: 'user1',
                    num_comments: 10,
                    created_utc: 1618317047,
                  },
                },
                {
                  data: {
                    id: 'post2',
                    title: 'Second post',
                    selftext: 'This is the second post',
                    preview: {
                      images: [
                        {
                          source: {
                            url: 'https://example.com/image2.jpg',
                          },
                        },
                      ],
                    },
                    ups: 456,
                    author: 'user2',
                    num_comments: 5,
                    created_utc: 1618317050,
                  },
                },
              ],
            },
          }),
        })
      );
  
      const subreddit = 'javascript';
      const posts = await fetchSubredditPosts(subreddit);
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`https://www.reddit.com/r/${subreddit}/hot.json`);
      expect(posts).toEqual([
        {
          id: 'post1',
          title: 'First post',
          text: 'This is the first post',
          image: 'https://example.com/image1.jpg',
          voteCount: 123,
          userAvatar: undefined, // Здесь пустое значение, так как в данных нет userAvatar
          userName: 'user1',
          comments: 10,
          created: 1618317047,
        },
        {
          id: 'post2',
          title: 'Second post',
          text: 'This is the second post',
          image: 'https://example.com/image2.jpg',
          voteCount: 456,
          userAvatar: undefined,
          userName: 'user2',
          comments: 5,
          created: 1618317050,
        },
      ]);
    });
  
    it('should return undefined and log an error if the network response is not ok', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
        })
      );
  
      const subreddit = 'javascript';
      const posts = await fetchSubredditPosts(subreddit);
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(posts).toBeUndefined();
      expect(consoleLogSpy).toHaveBeenCalledWith('Failed to fetch posts:', expect.any(Error));
  
      consoleLogSpy.mockRestore();
    });
  
    it('should return undefined and log an error if fetching posts fails', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch failed')));
  
      const subreddit = 'javascript';
      const posts = await fetchSubredditPosts(subreddit);
  
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(posts).toBeUndefined();
      expect(consoleLogSpy).toHaveBeenCalledWith('Failed to fetch posts:', expect.any(Error));
  
      consoleLogSpy.mockRestore();
    });
  });