const createCustomPopup = (point) => {
  const  {author, offer} = point;
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const popups = cardTemplate.cloneNode(true);

  popups.querySelector('.popup__title').textContent = offer.title;
  popups.querySelector('.popup__text--address').textContent = offer.address;
  popups.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

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

  const roomsEnding = (offer.rooms === 1) ? 'а' : 'ы';
  const guestsEnding = (offer.guests === 1) ? 'я' : 'ей';
  popups.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат${roomsEnding} для ${offer.guests} гост${guestsEnding}.`;
  popups.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;

  const FEATURES = offer.features;
  const elementContainer = popups.querySelector('.popup__features');
  const elementList = elementContainer.querySelectorAll('.popup__feature');
  const modifiers = FEATURES.map((facilities) => `popup__feature--${facilities}`);

  elementList.forEach((elementListItem) => {
    const modifier = elementListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      elementListItem.remove();
    }
  });

  popups.querySelector('.popup__description').textContent = offer.description;

  const PHOTOS = popups.querySelector('.popup__photos');
  const IMG = PHOTOS.querySelector('.popup__photo');
  const arrayPhotos = offer.photos;
  PHOTOS.innerHTML = '';

  for (let i = 0; i < arrayPhotos.length; i++) {
    const element = IMG.cloneNode(false);
    PHOTOS.appendChild(element).src = arrayPhotos[i];
  }

  popups.querySelector('.popup__avatar').src = author.avatar;
  return popups;
};

export {createCustomPopup};
