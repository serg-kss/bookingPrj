import { appartments_price_min, max_price, title_validation } from './data.js';
import { assignmentValue } from './util.js';

const cardFormApplication = document.querySelector('.ad-form');
const field_title = document.getElementById('title');
const field_type = document.getElementById('type');
const field_price = document.getElementById('price');
const field_time_in = document.getElementById('timein');
const field_time_out = document.getElementById('timeout');

field_title.addEventListener('change', fieldTitleHandler);
field_type.addEventListener('change', fieldTypeHandler);
field_price.addEventListener('change', fieldPriceHandler);
field_time_in.addEventListener('change', fieldTimeInHandler);
field_time_out.addEventListener('change', fieldTimeOutHandler);

//title validation
function fieldTitleHandler(event) {
  const field_value_lenght = String(event.target.value).length;
  console.log(field_value_lenght)
  if (field_value_lenght < title_validation.min_lenght) {
    field_title.value = '';
    alert('too short');
  } else if (field_value_lenght > title_validation.max_lenght){
    field_title.value = '';
    alert('too long');
  }
}

assignmentValue(field_price, field_type.value, appartments_price_min);

function fieldTypeHandler(event) {
  assignmentValue(field_price, event.target.value, appartments_price_min);
}

function fieldPriceHandler(event) {
  priceValidation(max_price, event.target.value, field_price);
}

function priceValidation(max_price, current_price, field_price) {
  if (parseInt(field_price.placeholder) > parseInt(current_price)) {
    field_price.style.cssText = 'color: red';
    alert('price is too small')
  } else if (parseInt(current_price) > max_price){
    field_price.style.cssText = 'color: red';
    alert('price is too big')
  } else {
    field_price.style.cssText = 'color: black';
  }
}

function fieldTimeInHandler (event) {field_time_out.value = event.target.value;}
function fieldTimeOutHandler (event) {field_time_in.value = event.target.value;}

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