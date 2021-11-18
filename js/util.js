import {formElement, mapFiltersElement} from './form.js';
import {map, resetMarker, markerGroup, createMarker} from './map.js';
import {getData} from './api.js';

const DISPLAY_ERROR_TIME = 1500;
const ALERT_SHOW_TIME = 1000;
const DEFAULT_PRICE_VALUE = '1000';
const DEFAULT_PREVIEW_AVATAR = 'img/muffin-grey.svg';
const DEFAULT_PREVIEW_PHOTO = '';

const priceResetForm = document.querySelector('#price');
const previewAvatarElement = document.querySelector('.ad-form-header__preview img');
const previewPhotoElement = document.querySelector('.ad-form__photo');

const resetElements = () => {
  priceResetForm.value = DEFAULT_PRICE_VALUE;
  previewAvatarElement.src = DEFAULT_PREVIEW_AVATAR;
  previewPhotoElement.innerHTML = DEFAULT_PREVIEW_PHOTO;
};

const resetMapShow = () => {
  map.closePopup();
  resetMarker();
  markerGroup.clearLayers();
};

const getDataOutput = () => {
  getData((data) => {
    const slicedData = data.slice(0, 10);
    slicedData.forEach((point) => {
      createMarker(point);
    });
  });
};

const getError = () => {
  const errorElement = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorNode = errorElement.cloneNode(true);

  document.body.append(errorNode);

  const documentErrorClickHeandler = (evt) => {
    evt.preventDefault();
    errorNode.remove();
    document.removeEventListener('click', documentErrorClickHeandler);
  };

  document.addEventListener('click', documentErrorClickHeandler);

  const documentErrorClickHeandlerEscape = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      errorNode.remove();
      document.removeEventListener('click', documentErrorClickHeandlerEscape);
    }
  };

  document.addEventListener('keydown', documentErrorClickHeandlerEscape);
};

const getSuccess = () => {
  const successElement = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successNode = successElement.cloneNode(true);

  document.body.append(successNode);

  setTimeout(() => {
    successNode.remove();
    mapFiltersElement.reset();
    formElement.reset();
    map.closePopup();
    getDataOutput();
    resetMapShow();
    resetElements();
    getDataOutput();
  }, DISPLAY_ERROR_TIME);
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

export {getError, getSuccess, resetMapShow, showAlert, resetElements, getDataOutput};
