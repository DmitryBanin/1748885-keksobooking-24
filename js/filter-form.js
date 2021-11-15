import {getData} from './api.js';
import {getRandomInteger, resetFilter, showAlert} from './util.js';
import {createMarker} from './map.js';
import {debounce} from './utils/debounce.js';
import {throttle} from './utils/throttle.js';

const mapFilters = document.querySelector('.map__filters');
const housingTypeFilter = mapFilters.querySelector('#housing-type');
const housingPriceFilter = mapFilters.querySelector('#housing-price');
const housingRoomsFilter = mapFilters.querySelector('#housing-rooms');
const housingGuestsFilter = mapFilters.querySelector('#housing-guests');
const housingFeaturesList = mapFilters.querySelectorAll('.map__checkbox');

const PriceLimits = {
  LOW: 10000,
  HIGH: 50000,
};

const getDataOutput = () => {
  getData((data) => {
    console.log(data);
    data.length = 10;
    data.forEach((point) => {
      createMarker(point);
    });
  });
};

getDataOutput();

const getFilterData = () => {
  resetFilter();
  getData((data) => {

    housingFeaturesList.forEach((element) => {
      if (element.checked) {
        const checkedElement = element.value;
        console.log(checkedElement);
        data = data.filter((pin) => pin.offer.features.includes(checkedElement));
      }
    });

    const filterPinsByType = (value) => {
      data = data.filter((pin) => pin.offer.type === value);
    };

    const filterPinsByPrice = (value) => {
      data = data.filter((pin) => {
        switch (value) {
          case 'middle':
            return (pin.offer.price >= PriceLimits.LOW) && (pin.offer.price <= PriceLimits.HIGH);
          case 'low':
            return pin.offer.price < PriceLimits.LOW;
          case 'high':
            return pin.offer.price > PriceLimits.HIGH;
          default:
            return false;
        }
      });
    };

    const filterPinsByRooms = (value) => {
      data = data.filter((pin) => pin.offer.rooms === Number(value));
    };

    const filterPinsByGuests = (value) => {
      data = data.filter((pin) => pin.offer.guests === Number(value));
    };

    const Filters = [
      {
        name: housingTypeFilter,
        filterFunction: filterPinsByType,
      },
      {
        name: housingPriceFilter,
        filterFunction: filterPinsByPrice,
      },
      {
        name: housingRoomsFilter,
        filterFunction: filterPinsByRooms,
      },
      {
        name: housingGuestsFilter,
        filterFunction: filterPinsByGuests,
      },
    ];

    Filters.forEach((obj) => {
      const selectValue = obj.name.value;

      if (selectValue !== 'any') {
        obj.filterFunction(selectValue);
      }
    });

    if (data.length === 0) {
      return showAlert('Нет совпадений');
    }
    data.length = 10;
    data.forEach((point) => {
      createMarker(point);
    });
  });
};

mapFilters.addEventListener('change', debounce(getFilterData));

// const resetFeatures = () => {
//   mapFilters.querySelectorAll('select').forEach((select) => {
//     select.value = 'any';
//   });
//   housingFeaturesList.forEach((element) => {
//     element.checked = false;
//   });
// };
// data.length = 10;

// Вариант 1
// const filtrationByFeatures = (item) => Array.from(housingFeaturesList).every((element) => item.offer.features.includes(element.id.replace(/filter-/g, '')));
// console.log(filtrationByFeatures());
// data = data.filter(filtrationByFeatures);

// Вариант 2

// mapFilters.querySelectorAll('select').forEach((select) => {
//   if (select.checked === 'any') {
//     return getDataOutput();
//   }
// });
