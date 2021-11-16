import {getPagesActivate} from './form.js';
import {createCustomPopup} from './creating-markup.js';

const map = L.map('map-canvas')
  .on('load', () => {
    getPagesActivate ();
  })
  .setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Главная метка

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.68172,
    lng: 139.75392,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const resetMarker = () => {
  marker.setLatLng({
    lat: 35.68172,
    lng: 139.75392,
  });

  map.setView({
    lat: 35.68172,
    lng: 139.75392,
  }, 13);
};

marker.addTo(map);

// Координаты в поле Адреса

marker.on('drag', (evt) => {
  const ADDRESS = document.querySelector('#address');
  const arrayСoordinates = evt.target.getLatLng();
  const {lat, lng} = arrayСoordinates;
  const LAT = lat.toFixed(5);
  const LNG = lng.toFixed(5);
  ADDRESS.value = `${LAT}, ${LNG}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {location} = point;
  const {lat, lng} = location;

  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const markers = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  markers
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(point));
};

export {createMarker, map, resetMarker, markerGroup};
