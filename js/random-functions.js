// функция для рандомного целого числа

function getRandomInteger (min, max) {
  if (max<=min || min<0) {
    return 'Введено недопустимое значение';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция для рандомного дробного числа

function getRandomFloatPoint (min, max, digits = 5) {
  if (max<=min || min<0 || digits<=0) {
    return 'Введено недопустимое значение';
  }
  return (Math.random() * (max - min) + min).toFixed(digits);
}

// функция вывода номера изображения аватарки

const getRandomAvatar = (avatar) => {
  const numberImg = getRandomInteger (0, 11);
  if (numberImg > 0) {
    avatar = (`0${ numberImg }`).slice(-2);
    return `img/avatars/user${  avatar  }.png`;
  }
  else {return 'img/avatars/default.png';}
};

// функция рандомного индекса массива строки

const getRandomArrayElement = (elements) => elements [getRandomInteger(0, elements.length - 1)];

const getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomLengthArray = function (value) {
  const randomLength = getRandomValue(0, value.length);
  return value.slice(0, randomLength);
};

export {getRandomInteger, getRandomFloatPoint, getRandomAvatar, getRandomArrayElement, getRandomLengthArray};
// export {getEnding};
