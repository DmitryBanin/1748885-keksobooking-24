// import {createMarker} from './map.js';
import {getError, getSuccess, showAlert} from './util.js';
import {AD_FORM} from './form.js';

// Получение данных с сервера
const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((dataServer) => {
      onSuccess(dataServer);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');
    });
};

// Отправка данных на сервер

AD_FORM.addEventListener('submit', (evt) => {
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
