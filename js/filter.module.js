import { filter, offers } from "./data.js";//импорт данных с сервака
import { map, markers, addMarkers } from "./map.module.js";

//поле с выбором типа жилья
const houseType = document.getElementById('housing-type');
houseType.addEventListener('change', housingTypeHandler);

//меняем тип жилья. фильтруем данные и переписываем маркеры карты
function housingTypeHandler(event) {
  filteredData = filterByParams(offers, event.target.value);
  for (let index = 0; index < markers.length; index++) {
    map.removeLayer(markers[index])
  }
  addMarkers(filteredData);
}

//функция фильтр
function filterByParams(offers, filterParams) {
    let dataFiltered = [];
    if (filterParams === filter.defaultType){//any
      dataFiltered = offers;
    } else {
     for (let index = 0; index < offers.length; index++) {
        if (offers[index].offer.type === filterParams) {
          dataFiltered.push(offers[index])
        } 
     }
    }
    //берем первые 10 отфильтрованных элементов
    if (dataFiltered.length > filter.limit) {
        dataFiltered.splice(filter.rangeMin, filter.rangeMax);
    }
    return dataFiltered;
}

export let filteredData = filterByParams(offers, filter.defaultType);
