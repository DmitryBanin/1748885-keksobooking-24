import {getPagesActivate} from './form.js';
import {objectGenerator} from './data.js';
import {createCustomPopup} from './creating-markup.js';

const map = L.map('map-canvas')
  .on('load', () => {
    getPagesActivate ();
  })
  .setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 10);

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
    lat: 35.681729,
    lng: 139.753927,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

// Вывод координат в поле Адреса

marker.on('drag', (evt) => {
  const ADDRESS = document.querySelector('#address');
  ADDRESS.value = evt.target.getLatLng();
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

objectGenerator.forEach((point) => {
  createMarker(point);
});
