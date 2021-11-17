import {getError, getSuccess, showAlert} from './util.js';
import {formElement} from './form.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((dataFromeServer) => {
      onSuccess(dataFromeServer);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');
    });
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        getSuccess();
      } else {
        getError();
      }
    })
    .catch(() => {
      getError();
    });
});

export {getData};
