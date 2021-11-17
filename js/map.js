import {getPagesActivate} from './form.js';
import {createCustomPopup} from './creating-markup.js';

const DefaultViewParametrs = {
  LAT: 35.68172,
  LNG: 139.75392,
  ZOOM: 13,
  MAGOR_PIN_SIZE: 52,
  PIN_SIZE: 40,
};

const map = L.map('map-canvas')
  .on('load', () => {
    getPagesActivate ();
  })
  .setView({
    lat: DefaultViewParametrs.LAT,
    lng: DefaultViewParametrs.LNG,
  }, DefaultViewParametrs.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [DefaultViewParametrs.MAGOR_PIN_SIZE, DefaultViewParametrs.MAGOR_PIN_SIZE],
  iconAnchor: [DefaultViewParametrs.MAGOR_PIN_SIZE/2, DefaultViewParametrs.MAGOR_PIN_SIZE],
});

const marker = L.marker(
  {
    lat: DefaultViewParametrs.LAT,
    lng: DefaultViewParametrs.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const resetMarker = () => {
  marker.setLatLng({
    lat: DefaultViewParametrs.LAT,
    lng: DefaultViewParametrs.LNG,
  });

  map.setView({
    lat: DefaultViewParametrs.LAT,
    lng: DefaultViewParametrs.LNG,
  }, DefaultViewParametrs.ZOOM);
};

marker.addTo(map);

marker.on('drag', (evt) => {
  const addressElement = document.querySelector('#address');
  const arrayСoordinates = evt.target.getLatLng();
  const {lat, lng} = arrayСoordinates;
  const latRounded = lat.toFixed(5);
  const lngRounded = lng.toFixed(5);
  addressElement.value = `${latRounded}, ${lngRounded}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {location} = point;
  const {lat, lng} = location;

  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [DefaultViewParametrs.PIN_SIZE, DefaultViewParametrs.PIN_SIZE],
    iconAnchor: [DefaultViewParametrs.PIN_SIZE/2, DefaultViewParametrs.PIN_SIZE],
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
