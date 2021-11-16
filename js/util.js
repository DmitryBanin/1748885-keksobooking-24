import {formElement, mapFiltersElement} from './form.js';
import {map, resetMarker, markerGroup} from './map.js';

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

const getSuccess = () => {
  const ERROR_SHOW_TIME = 1500;
  const success = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successElement = success.cloneNode(true);

  document.body.append(successElement);

  setTimeout(() => {
    successElement.remove();
    formElement.reset();
    mapFiltersElement.reset();
    map.closePopup();
    resetMarker();
  }, ERROR_SHOW_TIME);
};

const reset = document.querySelector('.ad-form__reset');

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  mapFiltersElement.reset();
  formElement.reset();
  map.closePopup();
  resetMarker();
});

function getRandomInteger (min, max) {
  if (max <= min || min < 0) {
    return 'Введено недопустимое значение';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const resetMapShow = () => {
  map.closePopup();
  resetMarker();
  markerGroup.clearLayers();
};

const showAlert = (message) => {
  const ALERT_SHOW_TIME = 1000;
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '25px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getError, getSuccess, getRandomInteger, resetMapShow, showAlert};
