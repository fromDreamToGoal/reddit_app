// Базовый URL для запросов к Reddit API
const BASE_URL = 'https://www.reddit.com';


export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(`${BASE_URL}/r/${subreddit}.json`);
    const json = await response.json();
    console.log(json);
    return json.data.children.map((post) => post.data);
  }
  catch (error) {
    console.log('Failed to fetch posts:', error);
  }
};

// Другие функции для работы с Reddit API можно добавить здесь