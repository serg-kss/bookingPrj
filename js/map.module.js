const LAT = 35.685257;
const LNG = 139.75146;
const map_container = document.getElementById('map-canvas');
const cardFormApplication = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const fieldSets = document.querySelectorAll('fieldset');

// page is not active
cardFormApplication.classList.add('ad-form--disabled');
filterForm.classList.add('ad-form--disabled');
//fieldSets.forEach((fieldSet) => {fieldSet.setAttribute('disabled', 'true')})

//create map
let map = L.map(map_container);


//page is acrive, after init
map.on('load', () => {
  cardFormApplication.classList.remove('ad-form--disabled');
  filterForm.classList.remove('ad-form--disabled');
  //fieldSets.forEach((fieldSet) => {fieldSet.setAttribute('disabled', 'false')})
});

map.setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let myIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

L.marker([LAT, LNG], {icon: myIcon}).addTo(map)
  .bindPopup('A pretty CSS popup.<br> Easily customizable.')
  .openPopup();