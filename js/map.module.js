import { filteredData } from "./filter.module.js";

//create map
const map_container = document.getElementById("map-canvas");
export let map = L.map(map_container);

const cardFormApplication = document.querySelector(".ad-form");
const filterForm = document.querySelector(".map__filters");

// page is not active
cardFormApplication.classList.add("ad-form--disabled");
filterForm.classList.add("ad-form--disabled");

//page is acrive, after init
map.on("load", () => {
  cardFormApplication.classList.remove("ad-form--disabled");
  filterForm.classList.remove("ad-form--disabled");
});

map.setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let myIcon = L.icon({
  iconUrl: "../img/main-pin.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

//массив маркеров
export let markers = []

//добавляем на карту маркеры согласно данным с сервака и в массив маркерс
export function addMarkers(filteredData) {
  filteredData.forEach((element) => {
    let marker = L.marker([element.offer.address.x, element.offer.address.y], {
      icon: myIcon,
    })
      .addTo(map)
      .bindPopup(element.offer.type)
      .openPopup();
    markers.push(marker)
  });
}
addMarkers(filteredData);