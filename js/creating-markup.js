const createCustomPopup = (point) => {
  const  {author, offer} = point;
  const cardTemplateElement = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const popupsCloneNode = cardTemplateElement.cloneNode(true);
  popupsCloneNode.querySelector('.popup__title').textContent = offer.title;
  popupsCloneNode.querySelector('.popup__text--address').textContent = offer.address;
  popupsCloneNode.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  const popupTypeElement = popupsCloneNode.querySelector('.popup__type');

  switch (offer.type) {
    case 'flat':
      popupTypeElement.textContent = 'Квартира';
      break;
    case 'bungalow':
      popupTypeElement.textContent = 'Бунгало';
      break;
    case 'house':
      popupTypeElement.textContent = 'Дом';
      break;
    case 'palace':
      popupTypeElement.textContent = 'Дворец';
      break;
    case 'hotel':
      popupTypeElement.textContent = 'Отель';
      break;
  }

  let declensionWordsRooms;
  if (offer.rooms === 1) {
    declensionWordsRooms = 'а';
  } else if (offer.rooms >= 5) {
    declensionWordsRooms = '';
  } else {
    declensionWordsRooms = 'ы';
  }

  const declensionWordsGuests = (offer.guests === 1) ? 'я' : 'ей';
  popupsCloneNode.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат${declensionWordsRooms} для ${offer.guests} гост${declensionWordsGuests}.`;
  popupsCloneNode.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;

  const featursArray = offer.features;
  const popupsFeaturesElement = popupsCloneNode.querySelector('.popup__features');
  if (!featursArray) {
    popupsFeaturesElement.innerHTML = '';
  } else {
    const elementList = popupsFeaturesElement.querySelectorAll('.popup__feature');
    const modifiers = featursArray.map((facilities) => `popup__feature--${facilities}`);

    elementList.forEach((elementListItem) => {
      const modifier = elementListItem.classList[1];

      if (!modifiers.includes(modifier)) {
        elementListItem.remove();
      }
    });
  }

  popupsCloneNode.querySelector('.popup__description').textContent = offer.description;

  const photoArray = offer.photos;
  const popupPhotoElements = popupsCloneNode.querySelector('.popup__photos');
  if (!photoArray) {
    popupPhotoElements.innerHTML = '';
  } else {
    const popupPhotoElement = popupPhotoElements.querySelector('.popup__photo');
    popupPhotoElements.innerHTML = '';

    for (let i = 0; i < photoArray.length; i++) {
      const element = popupPhotoElement.cloneNode(false);
      popupPhotoElements.appendChild(element).src = photoArray[i];
    }
  }
  popupsCloneNode.querySelector('.popup__avatar').src = author.avatar;
  return popupsCloneNode;
};

export {createCustomPopup};
