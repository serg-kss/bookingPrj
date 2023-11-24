import { 
  randoms_limits, 
  photos, 
  appartments_type, 
  check_in_out_time, 
  features 
} from './data.js';

import { 
  getRndInteger,
  getRndFloat,
  arrayRandElement,
  createRandSet,
  createRandArr 
} from './util.js';

function createLocation(x_min, x_max, y_min, y_max) {
  return {
    x:getRndFloat(x_min, x_max),
    y:getRndFloat(y_min, y_max),
  }
}

function createOffer() {
  const location = createLocation(randoms_limits.x_min, randoms_limits.x_max, randoms_limits.y_min, randoms_limits.y_max);
  return {
    author: {
      avatar:`img/avatars/user${'0'+ getRndInteger(randoms_limits.min, randoms_limits.max)}.png`,
    },
    offer: {
      title: 'Придумайте самостоятельно',
      address: `${location.x} ${location.y}`,
      price: Math.floor(Math.random() * randoms_limits.max_price),
      type: arrayRandElement(appartments_type),
      rooms: Math.floor(Math.random() * randoms_limits.max_rooms),
      guests: Math.floor(Math.random() * randoms_limits.max_rooms),
      checkin: arrayRandElement(check_in_out_time),
      checkout: arrayRandElement(check_in_out_time),
      features: createRandSet(features),
      description: 'Придумайте самостоятельно',
      photos: createRandArr(photos),
    },
  }
}

function createOffers() {
  const offers = [];
  for (let index = 0; index < 10; index++) {
    offers.push(createOffer())  
  }
  return offers;
}

export const offers = createOffers();
