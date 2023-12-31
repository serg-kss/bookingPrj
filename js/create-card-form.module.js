import { appartments_price_min, max_price, title_validation } from './data.js';
import { assignmentValue, disableElement } from './util.js';

const cardFormApplication = document.querySelector('.ad-form');
const field_title = document.getElementById('title');
const field_type = document.getElementById('type');
const field_price = document.getElementById('price');
const field_time_in = document.getElementById('timein');
const field_time_out = document.getElementById('timeout');
const field_room_number = document.getElementById('room_number');
const field_capacity = document.getElementById('capacity');
const default_value = '';
const guestsRooms = {
  oneGuest: '1',
  twoGuest: '2',
  threeGuest: '3',
  noGuest: '0',
  hundredRooms: '100'
}

field_title.addEventListener('change', fieldTitleHandler);
field_type.addEventListener('change', fieldTypeHandler);
field_price.addEventListener('change', fieldPriceHandler);
field_time_in.addEventListener('change', fieldTimeInHandler);
field_time_out.addEventListener('change', fieldTimeOutHandler);
field_room_number.addEventListener('change', fieldRoomNumberHandler)

//title validation
function fieldTitleHandler(event) {
  const field_value_lenght = String(event.target.value).length;
  console.log(field_value_lenght)
  if (field_value_lenght < title_validation.min_lenght) {
    field_title.value = default_value;
    alert('too short');
  } else if (field_value_lenght > title_validation.max_lenght){
    field_title.value = default_value;
    alert('too long');
  }
}

//функция назначает значения по умолчанию для каждого типа жилья
assignmentValue(field_price, field_type.value, appartments_price_min);

//при выборе типа жилья устанавливаем поле цены ноль
//и назначаем полям значения по умолчанию
function fieldTypeHandler(event) {
  field_price.value = default_value;
  assignmentValue(field_price, event.target.value, appartments_price_min);
}

//отслеживем цену и проводим валидацию
function fieldPriceHandler(event) {
  priceValidation(max_price, event.target.value, field_price);
}

//validation цена жилья
function priceValidation(max_price, current_price, field_price) {
  if (parseInt(field_price.placeholder) > parseInt(current_price)) {
    alert('price is too small')
    field_price.value = default_value;
  } else if (parseInt(current_price) > max_price){
    alert('price is too big')
    field_price.value = default_value;
  }
}
//установка синхронизации полей время заезд и выезд
function fieldTimeInHandler (event) {field_time_out.value = event.target.value;}
function fieldTimeOutHandler (event) {field_time_in.value = event.target.value;}

//по умолчанию для одной комнаты при загрузке страницы
function defaultRoom(field_capacity) {
  const capacity = field_capacity.children;
  const default_capacity = guestsRooms.oneGuest;
  Array.from(capacity).forEach( (element) => {
    if (element.value != default_capacity) {
      disableElement(element);
    }
  })
  field_capacity.value = default_capacity
}
defaultRoom(field_capacity);

//смотрим сколько комнат выбрано, затем отключаем ненужные варианты,
function fieldRoomNumberHandler (event) {
  const capacity = field_capacity.children;
  //берем options (колличество мест) и делаем их активными
  Array.from(capacity).forEach((element) => {
    element.removeAttribute("disabled");
  })
  //колличество комнат,  тут надо сопоставить колличество комнат с кол гостями и отключить ненужные варианты 
  const room_value = event.target.value;

  if (room_value == guestsRooms.oneGuest) {
    Array.from(capacity).forEach( (element) => {
      if (element.value != guestsRooms.oneGuest) {
        disableElement(element);
      }
    })
    field_capacity.value = guestsRooms.oneGuest; // вставляем значение в поле формы
  } else if (room_value == guestsRooms.twoGuest){
    Array.from(capacity).forEach( (element) => {
      if (element.value > guestsRooms.twoGuest || element.value == guestsRooms.noGuest) {
        disableElement(element);
      }
    })
  } else if (room_value == guestsRooms.threeGuest){
    Array.from(capacity).forEach( (element) => {
      if (element.value > guestsRooms.threeGuest || element.value == guestsRooms.noGuest) {
        disableElement(element);
      }
    })
  } else if (room_value == guestsRooms.hundredRooms){
    Array.from(capacity).forEach( (element) => {
      if (element.value != guestsRooms.noGuest) {
        disableElement(element);
      }
    })
    field_capacity.value = guestsRooms.noGuest;
  }
}

function serializeForm(formNode) {
  const { elements } = formNode
  //dataform form data
  Array.from(elements)
    .forEach((element) => {
      const { name, value } = element
      console.log({ name, value })
    })
}
  
  
function handleFormSubmit(event) {
  event.preventDefault();
  serializeForm(cardFormApplication)
}
cardFormApplication.addEventListener('submit', handleFormSubmit)