/*
const TITLES = [
  'Квартира студия в престижном районе',
  'Тихая квартирка недалеко от метро',
  'Императорский дворец в центре Токио',
];
const PRICES = [25000, 100000];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const ROOMS = [1, 4];
const GUESTS = [1, 4];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Хейтеров просьба не беспокоить.',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_BOUNDS = [
  35.65000,
  35.70000,
];

const LNG_BOUNDS = [
  139.70000,
  139.80000,
];

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
  avatar = (`0${  getRandomInteger (0, 10)}`).slice(-2);
  return `img/avatars/user${  avatar  }.png`;
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
*/

import {TITLES, PRICES, TYPES, ROOMS, GUESTS, CHECKIN, CHECKOUT, FEATURES, DESCRIPTIONS, PHOTOS, LAT_BOUNDS, LNG_BOUNDS} from './data.js';
import {getRandomAvatar, getRandomArrayElement, getRandomInteger, getRandomFloatPoint, getRandomLengthArray} from './random-functions.js';

// функция рандомных координат

const createAdvertisement = () => {
  const randomLat = getRandomFloatPoint(...LAT_BOUNDS);
  const randomLng = getRandomFloatPoint(...LNG_BOUNDS);

  return {
    author: {
      avatar: getRandomAvatar(),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${randomLat}, ${randomLng}`,
      price: getRandomInteger(...PRICES),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(...ROOMS),
      guests: getRandomInteger(...GUESTS),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomLengthArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomLengthArray(PHOTOS),
    },
    location: {
      lat: randomLat,
      lng: randomLng,
    },
  };
};

const objectGenerator = new Array(10).fill(null).map(createAdvertisement);
objectGenerator;
