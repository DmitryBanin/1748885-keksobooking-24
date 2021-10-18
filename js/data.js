import {getRandomAvatar, getRandomArrayElement, getRandomInteger, getRandomFloatPoint, getRandomLengthArray} from './random-functions.js';

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

const objectGenerator = new Array(1).fill(null).map(createAdvertisement);
export {objectGenerator};
