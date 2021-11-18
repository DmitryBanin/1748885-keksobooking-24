import {map} from './map.js';
import {formElement, mapFiltersElement} from './form.js';
import {getDataOutput} from './util.js';
import {resetMapShow, resetElements} from './util.js';

const resetFormElement = document.querySelector('.ad-form__reset');

const resetFormClickHeandler = (evt) => {
  evt.preventDefault();
  mapFiltersElement.reset();
  formElement.reset();
  map.closePopup();
  getDataOutput();
  resetMapShow();
  resetElements();
  document.removeEventListener('click', resetFormClickHeandler);
};

resetFormElement.addEventListener('click', resetFormClickHeandler);


