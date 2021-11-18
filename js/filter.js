import {resetMapShow, showAlert, getDataOutput} from './util.js';
import {createMarker} from './map.js';
import {debounce} from './utils/debounce.js';
import {getData} from './api.js';

const PriceLimits = {
  LOW: 10000,
  HIGH: 50000,
};

const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersElement.querySelector('#housing-guests');

getDataOutput();

const getFilterData = () => {
  resetMapShow();
  getData((data) => {

    const getFeaturesRank = (element) => {
      const selectedFeaturesElements = mapFiltersElement.querySelectorAll('.map__checkbox:checked');
      let rank = 0;
      selectedFeaturesElements.forEach((feature) => {
        if (element.offer.features && element.offer.features.includes(feature.value)) {
          rank += 1;
        }
      });
      return rank;
    };

    const compareOfferRank = (wizardA, wizardB) => {
      const offerRankA = getFeaturesRank(wizardA);
      const offerRankB = getFeaturesRank(wizardB);
      return offerRankB - offerRankA;
    };

    data = data.sort(compareOfferRank);

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

    const filters = [
      {
        name: housingTypeElement,
        filterFunction: filterPinsByType,
      },
      {
        name: housingPriceElement,
        filterFunction: filterPinsByPrice,
      },
      {
        name: housingRoomsElement,
        filterFunction: filterPinsByRooms,
      },
      {
        name: housingGuestsElement,
        filterFunction: filterPinsByGuests,
      },
    ];

    filters.forEach((object) => {
      const selectValue = object.name.value;

      if (selectValue !== 'any') {
        object.filterFunction(selectValue);
      }
    });

    if (data.length === 0) {
      return showAlert('Нет совпадений');
    }
    const filteredData = data.slice(0, 10);
    filteredData.forEach((point) => {
      createMarker(point);
    });
  });
};

mapFiltersElement.addEventListener('change', debounce(getFilterData));
