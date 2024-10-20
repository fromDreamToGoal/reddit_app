// Функция для получения информации об авторе
const fetchUserAvatar = async (username) => {
  try {
    const response = await fetch(`https://www.reddit.com/user/${username}/about.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data.icon_img;
  } catch (error) {
    console.log('Failed to fetch user avatar:', error);
    return null; // В случае ошибки возвращаем null
  }
};

export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Создаём массив промисов для получения аватарок каждого пользователя
    const posts = await Promise.all(data.data.children.map(async (post) => {
      const userAvatar = await fetchUserAvatar(post.data.author); // Получаем аватарку для каждого поста
      return {
        id: post.data.id,
        title: post.data.title,
        text: post.data.selftext,
        image: post.data.preview?.images[0]?.source?.url.replace(/&amp;/g, '&'),
        voteCount: post.data.ups,
        userAvatar: userAvatar, // Присваиваем аватар для каждого поста
        userName: post.data.author,
        comments: post.data.num_comments,
        created: post.data.created_utc,
      };
    }));

    return posts;
  } catch (error) {
    console.log('Failed to fetch posts:', error);
  }
};