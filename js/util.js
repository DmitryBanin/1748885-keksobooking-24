import {AD_FORM, MAP_FILTERS} from './form.js';
import {map,resetMarker} from './map.js';

// Сообщение об ошибке создания объявления

const getError = () => {
  const error = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorElement = error.cloneNode(true);

  document.body.append(errorElement);

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorElement.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorElement.remove();
    }
  });
};

// Сообщение об успешном создании объявления

const getSuccess = () => {
  const ERROR_SHOW_TIME = 1500;
  const success = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successElement = success.cloneNode(true);

  document.body.append(successElement);

  setTimeout(() => {
    successElement.remove();
    AD_FORM.reset();
    MAP_FILTERS.reset();
    map.closePopup();
    resetMarker();
  }, ERROR_SHOW_TIME);
};

// очистить

const reset = document.querySelector('.ad-form__reset');

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  MAP_FILTERS.reset();
  AD_FORM.reset();
  map.closePopup();
  resetMarker();
});

export {getError, getSuccess};
