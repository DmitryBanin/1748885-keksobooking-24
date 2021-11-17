import {formElement, mapFiltersElement} from './form.js';
import {map, resetMarker, markerGroup} from './map.js';

const DISPLAY_ERROR_TIME = 1500;
const ALERT_SHOW_TIME = 1000;

const getError = () => {
  const errorElement = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorNode = errorElement.cloneNode(true);

  document.body.append(errorNode);

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorNode.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorNode.remove();
    }
  });
};

const getSuccess = () => {
  const successElement = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successNode = successElement.cloneNode(true);

  document.body.append(successNode);

  setTimeout(() => {
    successNode.remove();
    formElement.reset();
    mapFiltersElement.reset();
    map.closePopup();
    resetMarker();
  }, DISPLAY_ERROR_TIME);
};

const resetMapShow = () => {
  map.closePopup();
  resetMarker();
  markerGroup.clearLayers();
};

const showAlert = (message) => {
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

export {getError, getSuccess, resetMapShow, showAlert};
