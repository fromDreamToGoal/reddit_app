// Базовый URL для запросов к Reddit API
//const BASE_URL = 'https://www.reddit.com';


export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.children.map((post) => ({
      id: post.data.id,
      title: post.data.title,
      text: post.data.selftext,
      image: post.data.preview?.images[0]?.source?.url.replace(/&amp;/g, '&'), // Используем высокое разрешение изображения
      voteCount: post.data.ups,
      userAvatar: post.data.icon_img,
      userName: post.data.author,
      comments: post.data.num_comments,
      created: post.data.num_comments,
    }));
  }
  catch (error) {
    console.log('Failed to fetch posts:', error);
  }
};

// Другие функции для работы с Reddit API можно добавить здесь