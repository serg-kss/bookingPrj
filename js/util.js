export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function getRndFloat(min, max) {
  return Math.random() * (max - min + 1)  + min;
}

export function arrayRandElement(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

export function createRandSet(arr) {
  let new_arr = []
  for (let index = 0; index < Math.floor(Math.random() * arr.length); index++) {
    new_arr.push(arrayRandElement(arr))
  }
  return new Set(new_arr);
}

export function createRandArr(arr) {
  let new_arr = [];
  for (let index = 0; index < Math.floor(Math.random() * arr.length); index++) {
    new_arr.push(arrayRandElement(arr))
  }
  if (!new_arr.length) {
    createRandArr(arr)
  }
  return new_arr;
}

export function assignmentValue(field, value, obj) {
  for(let key in obj) {
    if (key == value) {
      field.placeholder = obj[key]
    }
  }
}