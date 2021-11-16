const formElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const titleElement = formElement.querySelector('#title');
const roomNumberElement = formElement.querySelector('#room_number');
const capacityElement = formElement.querySelector('#capacity');
const priceElement = formElement.querySelector('#price');
const typeElement = formElement.querySelector('#type');
const timeInElement = formElement.querySelector('#timein');
const timeOutElement = formElement.querySelector('#timeout');

function getPagesDisabled () {
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
}

function getPagesActivate () {
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
}

const MIN_TEXT_LENGTH = 30;
const MAX_TEXT_LENGTH = 100;

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

const roomsGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

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

const roomsPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const changeHousingType = (value) => {
  let roomPrice = 0;
  switch (value) {
    case 'bungalow':
      roomPrice = roomsPrices.BUNGALOW;
      break;
    case 'flat':
      roomPrice = roomsPrices.FLAT;
      break;
    case 'hotel':
      roomPrice = roomsPrices.HOTEL;
      break;
    case 'house':
      roomPrice = roomsPrices.HOUSE;
      break;
    case 'palace':
      roomPrice = roomsPrices.PALACE;
      break;
  }
  priceElement.placeholder = roomPrice;
};

changeHousingType(typeElement.value);

typeElement.addEventListener('change', (evt) => {
  changeHousingType(evt.target.value);
  switch (typeElement.value) {
    case 'bungalow':
      priceElement.min = 0;
      break;
    case 'flat':
      priceElement.min = 1000;
      break;
    case 'hotel':
      priceElement.min = 3000;
      break;
    case 'house':
      priceElement.min = 5000;
      break;
    case 'palace':
      priceElement.min = 10000;
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

getPagesDisabled ();

export {getPagesActivate, formElement, mapFiltersElement};
