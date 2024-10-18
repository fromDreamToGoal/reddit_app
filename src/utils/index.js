
export const calculatePostDate = (created) => {
    // Если значение меньше 60 — это минуты
    if (created < 60) {
      return `${created} minutes ago`;
    } 
    // Если значение меньше 24*60 — это часы
    else if (created < 24 * 60) {
      const hours = Math.floor(created / 60);
      return `${hours} hours ago`;
    } 
    // Всё, что больше — это дни
    else {
      const days = Math.floor(created / (24 * 60));
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