import { offers } from './main.module.js';

const offers_block = document.querySelector('#map-canvas');
const template = document.querySelector('#card');

function createCard(obj) {

  const card = template.content.cloneNode(true);

  const title = card.querySelector('.popup__title');
  const address = card.querySelector('.popup__text--address');
  const price = card.querySelector('.popup__text--price');
  const type = card.querySelector('.popup__type');
  const capacity = card.querySelector('.popup__text--capacity');
  const time = card.querySelector('.popup__text--time');
  const description = card.querySelector('.popup__description');
  const photos = card.querySelector('.popup__photos');
  const avatar = card.querySelector('.popup__avatar');


  const appartments_types = {// обьеты в единственном числе
    place: 'Дворец',
    house: 'Дом',
    bungalow: 'Бунгало',
    flat: 'Квартира',
  }

  title.textContent = obj.offer.title;
  address.textContent = obj.offer.address;
  price.textContent = `${obj.offer.price} $/ночь`;
  type.textContent = appartments_types[obj.offer.type]//динамические ключи в обьектах
  capacity.textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
  time.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;

  obj.offer.features.forEach((value) => {
    card.querySelector(`.popup__feature--${value}`).textContent = value;
  });
  
  description.textContent = obj.offer.description;

  photos.replaceChildren('');
  obj.offer.photos.map((url)=>{
    const new_photo = document.createElement('img');
    new_photo.classList.add('popup__photo');
    new_photo.src = url;
    photos.prepend(new_photo);
  })

  avatar.src = obj.author.avatar;
  return card;
}

function createCards() {

  let fragment = new DocumentFragment();

  for (let index = 0; index < offers.length; index++) {
    fragment.append(createCard(offers[index])) 
  }
  offers_block.append(fragment)
}

//createCards();