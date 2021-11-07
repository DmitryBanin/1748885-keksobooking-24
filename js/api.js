import {createMarker} from './map.js';
import {getError, getSuccess} from './util.js';
import {AD_FORM} from './form.js';

const showAlert = (message) => {
  const ALERT_SHOW_TIME = 5000;
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

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error;
  })
  .then((data) => {
    data.forEach((point) => {
      createMarker(point);
    });
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные');
  });

// Отправка данных

const setUserFormSubmit = () => {
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
};

setUserFormSubmit();
