const MIN_TEXT_LENGTH = 30;
const MAX_TEXT_LENGTH = 100;

const roomsGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const RoomsPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const formElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const titleElement = formElement.querySelector('#title');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const priceElement = formElement.querySelector('#price');
const typeElement = formElement.querySelector('#type');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');

const getPagesDisabled = () => {
  formElement.classList.add('ad-form--disabled');
  const fieldsetElements = formElement.querySelectorAll('fieldset');
  fieldsetElements.forEach((disabled) => {
    disabled.setAttribute('disabled', 'disabled');
  });
  mapFiltersElement.classList.add('map__filters--disabled');
  const selectElements = mapFiltersElement.querySelectorAll('select');
  selectElements.forEach((disabled) => {
    disabled.setAttribute('disabled', 'disabled');
  });
};

const getPagesActivate = () => {
  formElement.classList.remove('ad-form--disabled');
  const fieldsetElements = formElement.querySelectorAll('fieldset');
  fieldsetElements.forEach((disabled) => {
    disabled.removeAttribute('disabled', 'disabled');
  });
  mapFiltersElement.classList.remove('map__filters--disabled');
  const selectElements = mapFiltersElement.querySelectorAll('select');
  selectElements.forEach((disabled) => {
    disabled.removeAttribute('disabled', 'disabled');
  });
};

titleElement.addEventListener('input', () => {
  const valueLength = titleElement.value.length;
  if (valueLength < MIN_TEXT_LENGTH) {
    titleElement.setCustomValidity(`Ещё ${ MIN_TEXT_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TEXT_LENGTH) {
    titleElement.setCustomValidity(`Удалите лишние ${ valueLength - MAX_TEXT_LENGTH } симв.`);
  } else {
    titleElement.setCustomValidity('');
  }
  titleElement.reportValidity();
});

const changeRoomNumberValue = (value) => {
  [...capacityElement.options].forEach((option) => {
    option.disabled = !roomsGuests[value].includes(option.value);
  });
  capacityElement.value = value > 3 ? '0' : value;
};

changeRoomNumberValue(roomNumberElement.value);

roomNumberElement.addEventListener('change', (evt) => {
  changeRoomNumberValue(evt.target.value);
});

const changeHousingType = (value) => {
  let roomPrice = 0;
  switch (value) {
    case 'bungalow':
      roomPrice = RoomsPrices.BUNGALOW;
      break;
    case 'flat':
      roomPrice = RoomsPrices.FLAT;
      break;
    case 'hotel':
      roomPrice = RoomsPrices.HOTEL;
      break;
    case 'house':
      roomPrice = RoomsPrices.HOUSE;
      break;
    case 'palace':
      roomPrice = RoomsPrices.PALACE;
      break;
  }
  priceElement.placeholder = roomPrice;
};

changeHousingType(typeElement.value);

typeElement.addEventListener('change', (evt) => {
  changeHousingType(evt.target.value);
  switch (typeElement.value) {
    case 'bungalow':
      priceElement.min = RoomsPrices.BUNGALOW;
      break;
    case 'flat':
      priceElement.min = RoomsPrices.FLAT;
      break;
    case 'hotel':
      priceElement.min = RoomsPrices.HOTEL;
      break;
    case 'house':
      priceElement.min = RoomsPrices.HOUSE;
      break;
    case 'palace':
      priceElement.min = RoomsPrices.PALACE;
      break;
    default:
      return priceElement.setCustomValidity('');
  }
  priceElement.reportValidity();
});

const changeTimeOutValue = (value) => {
  timeOutElement.value = value;
};

const changeTimeInValue = (value) => {
  timeInElement.value = value;
};

changeTimeOutValue(timeInElement.value);

timeInElement.addEventListener('change', (evt) => {
  changeTimeOutValue(evt.target.value);
});

timeOutElement.addEventListener('change', (evt) =>{
  changeTimeInValue(evt.target.value);
});

export {getPagesActivate, getPagesDisabled, formElement, mapFiltersElement};
