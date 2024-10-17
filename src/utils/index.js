
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

