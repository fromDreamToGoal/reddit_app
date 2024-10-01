import axios from 'axios';

// Базовый URL для запросов к Reddit API
const BASE_URL = 'https://www.reddit.com';

// Функция для получения постов из сабреддита
export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await axios.get(`${BASE_URL}/r/${subreddit}.json`);
    return response.data.data.children.map((post) => post.data); // Маппинг данных
  } catch (error) {
    throw new Error('Не удалось получить посты из Reddit');
  }
};

// Другие функции для работы с Reddit API можно добавить здесь