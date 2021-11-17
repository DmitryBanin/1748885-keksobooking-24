import {map, resetMarker} from './map.js';
import {formElement, mapFiltersElement} from './form.js';

const resetFormElement = document.querySelector('.ad-form__reset');
const priceresetForm = document.querySelector('#price');

resetFormElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  mapFiltersElement.reset();
  formElement.reset();
  map.closePopup();
  resetMarker();
  priceresetForm.placeholder = '1000';
});
