
//get data from server
const getOffersUrl = "http://localhost:4000/api/offers";
let response = await fetch(getOffersUrl);
let dataServer = await response.json();
//поле с выбором типа жилья
const housingType = document.getElementById('housing-type');
//параметры фильтра
let filterParams = {
    houseType: 'any',
}
//отфильтрованный массив данных для передачи в карту
export let offersMap = filterByParams(dataServer, filterParams);

//событие ченж для отслеживания типа жилья
housingType.addEventListener('change', housingTypeHandler);

//присваиваем в параментры фильтра выбранное жилье и запускаем функцию фильтр
function housingTypeHandler(event) {
    filterParams.houseType = event.target.value;
    filterByParams(dataServer, filterParams);
}

//функция фильтр
function filterByParams(dataServer, filterParams) {
    //пустой массив в который положим нужные элементы после фильтрации
    let dataFiltered = [];
    //проходим по данным с сервака
    for (let index = 0; index < dataServer.length; index++) {
      //если тип жилья указанный в данных с сервака равен типу выбранному пользоватедем 
        if (dataServer[index].offer.type === filterParams.houseType && dataServer[index].offer.type === 'any') {
          console.log('не заходит сюда')
          //пушим обьект в массив
          //иф не срабатывает!!!!
          //проверил тип данных и там и там строка правописание правильное везде
          dataFiltered.push(dataServer[index])
        } 
    }
    //берем первые 10 отфильтрованных элементов
    if (dataFiltered.length > 10) {
        dataFiltered.splice(0,9);
    }
    return dataFiltered;
}


