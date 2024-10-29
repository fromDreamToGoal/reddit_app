
export const calculatePostDate = (created) => {
  // Преобразуем Reddit timestamp в миллисекунды и создаем объект даты
  const postDate = new Date(created * 1000);
  const currentDate = new Date();
  
  // Разница во времени в миллисекундах
  const timeDifference = currentDate - postDate;

  // Переводим разницу в секунды, минуты, часы и дни
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};


export function getRandomInteger(min, max) {
    // Убедимся, что значения min и max целые числа
    min = Math.ceil(min);
    max = Math.floor(max);
    // Генерация случайного числа в диапазоне, включая min и max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Массив с URL различных аватарок по умолчанию
const defaultAvatars = [
      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png',
      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png',
      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png',
      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png',
      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png',
      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png',
      'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png',
];

// Функция для выбора случайной аватарки
export const getRandomAvatar = () => {
      const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
      return defaultAvatars[randomIndex];
};