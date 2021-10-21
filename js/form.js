
// код для валидации формы добавления объявления
const AD_FORM = document.querySelector('.ad-form');
const TITLE = AD_FORM.querySelector('#title');
const ROOM_NUMBER = AD_FORM.querySelector('#room_number');
const CAPACITY = AD_FORM.querySelector('#capacity');
const PRICE = AD_FORM.querySelector('#price');
const TYPE = AD_FORM.querySelector('#type');
const TIME_IN = AD_FORM.querySelector('#timein');
const TIME_OUT = AD_FORM.querySelector('#timeout');
//const ADDRESS = AD_FORM.querySelector('#address');

const MIN_TEXT_LENGTH = 30;
const MAX_TEXT_LENGTH = 100;

TITLE.addEventListener('input', () => {
  const valueLength = TITLE.value.length;
  if (valueLength < MIN_TEXT_LENGTH) {
    TITLE.setCustomValidity(`Ещё ${ MIN_TEXT_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TEXT_LENGTH) {
    TITLE.setCustomValidity(`Удалите лишние ${ valueLength - MAX_TEXT_LENGTH } симв.`);
  } else {
    TITLE.setCustomValidity('');
  }
  TITLE.reportValidity();
});

// Количество комнат - Количество мест

const RoomsGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const changeRoomNumberValue = (value) => {
  [...CAPACITY.options].forEach((option) => {
    option.disabled = !RoomsGuests[value].includes(option.value);
  });
  CAPACITY.value = value > 3 ? '0' : value;
};

changeRoomNumberValue(ROOM_NUMBER.value);

ROOM_NUMBER.addEventListener('change', (evt) => {
  changeRoomNumberValue(evt.target.value);
});

// Тип жилья - Цена за ночь

const RoomsPrices = {
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
  PRICE.placeholder = roomPrice;
};

changeHousingType(TYPE.value);

TYPE.addEventListener('change', (evt) => {
  changeHousingType(evt.target.value);
  if (TYPE.value === 'bungalow') {
    PRICE.min = 0;
  } else if (TYPE.value === 'flat') {
    PRICE.min = 1000;
  } else if (TYPE.value === 'hotel') {
    PRICE.min = 3000;
  } else if (TYPE.value === 'house') {
    PRICE.min = 5000;
  } else if (TYPE.value === 'palace') {
    PRICE.min = 10000;
  } else {
    PRICE.setCustomValidity('');
  }
  PRICE.reportValidity();
});

// Время заезда, Время выезда

const changeTimeOutValue = (value) => {
  TIME_OUT.value = value;
};

const changeTimeInValue = (value) => {
  TIME_IN.value = value;
};

changeTimeOutValue(TIME_IN.value);

TIME_IN.addEventListener('change', (evt) => {
  changeTimeOutValue(evt.target.value);
});

TIME_OUT.addEventListener('change', (evt) =>{
  changeTimeInValue(evt.target.value);
});

TIME_IN.addEventListener('change', (evt) => {
  changeTimeOutValue(evt.target.value);
});

TIME_OUT.addEventListener('change', (evt) =>{
  changeTimeInValue(evt.target.value);
});
