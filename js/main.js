// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInteger (min, max) {
  if (max<=min || min<0) {
    return 'Введено недопустимое значение';
  }
  min = Math.ceil(min); // метод округляет число до целого в большую сторону
  max = Math.floor(max); // метод округляет число до целого в меньшую сторону
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}


function getRandomСoordinates (min, max, quantityNum) {
  if (max<=min || min<0 || quantityNum<=0) {
    return 'Введено недопустимое значение';
  }
  return (Math.random() * (max - min) + min).toFixed(quantityNum);
}

getRandomInteger (0, 10);
getRandomСoordinates (0, 10);
