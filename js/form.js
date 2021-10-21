
// код для валидации формы добавления объявления
const AD_FORM = document.querySelector('.ad-form');
const TITLE = document.querySelector('#title');
const ROOM_NUMBER = document.querySelector('#room_number');
const CAPACITY = document.querySelector('#capacity');
//const PRICE = document.querySelector('#price');
//const TYPE = document.querySelector('#type');
//const ADDRESS = document.querySelector('#address');

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

const ROOMS_GUESTS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const changeRoomNumberValue = (value) => {
  [...CAPACITY.options].forEach((option) => {
    option.disabled = !ROOMS_GUESTS[value].includes(option.value);
  });
  CAPACITY.value = value > 3 ? '0' : value;
};

changeRoomNumberValue(ROOM_NUMBER.value);

ROOM_NUMBER.addEventListener('change', (evt) => {
  changeRoomNumberValue(evt.target.value);
});

AD_FORM.addEventListener('reset', (evt) => {
  evt.preventDefault();
  changeRoomNumberValue(ROOM_NUMBER.value);
  window.pageActivate.getDeactivePage();
  window.form.getResetForm();
});


// Количество комнат и количество мест

// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

// document.querySelector('form').onchange = function(e) {
//   this.timein.value = e.target.value;
//   this.timeout.value = e.target.value;
// };
