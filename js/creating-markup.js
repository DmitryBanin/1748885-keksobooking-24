import {objectGenerator} from './data.js';
// import {getEnding} from './random-functions.js';

// Генерация разметки похожих элементов

const insertIntoBlock = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const insert = document.createDocumentFragment();

objectGenerator.forEach(({author, offer, location}) => {
  const popups = cardTemplate.cloneNode(true);
  popups.querySelector('.popup__title').textContent = offer.title;
  popups.querySelector('.popup__text--address').textContent = location.address;
  popups.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  //строкой вида {{offer.price}} ₽/ночь

  const GUP = popups.querySelector('.popup__type');
  switch (offer.type) {
    case 'flat':
      GUP.textContent = 'Квартира';
      break;
    case 'bungalow':
      GUP.textContent = 'Бунгало';
      break;
    case 'house':
      GUP.textContent = 'Дом';
      break;
    case 'palace':
      GUP.textContent = 'Дворец';
      break;
    case 'hotel':
      GUP.textContent = 'Отель';
      break;
  }

  popups.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гость.`;

  // const number = offer.guests;
  // const sklonenie = (number, txt) => txt[(number > 1 ) ? 0 : txt[(number === 1) ? 1]
  // popups.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гост${sklonenie(number, ['ь', 'ей'])}.`;

  popups.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;


  const FEATURES = offer.features;
  const elementContainer = popups.querySelector('.popup__features');
  const elementList = elementContainer.querySelectorAll('.popup__feature');
  const modifiers = FEATURES.map((userEmotion) => `popup__feature--${userEmotion}`);

  elementList.forEach((elementListItem) => {
    const modifier = elementListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      elementListItem.remove();
    }
  });

  //выведите все доступные удобства в объявлении
  popups.querySelector('.popup__description').textContent = offer.description;

  //записать в атрибут src соответствующие иображения
  const PHOTOS = popups.querySelector('.popup__photos');
  const IMG = PHOTOS.querySelector('.popup__photo');
  const arrFotos = offer.photos;
  PHOTOS.innerHTML = '';

  for (let i=0; i<arrFotos.length; i++) {
    const element = IMG.cloneNode(false);
    PHOTOS.appendChild(element).src = arrFotos[i];
  }

  popups.querySelector('.popup__avatar').src = author.avatar;
  insert.appendChild(popups);
});

insertIntoBlock.appendChild(insert);
