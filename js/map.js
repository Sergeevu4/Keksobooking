'use strict';

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
//

function getRandomElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function getRandomlengths(array) {
  return array.slice(getRandomInteger(0, array.length - 1));
}

var titleArray = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typeArray = ['palace', 'flat', 'house', 'bungalo'];

var checkoutArray = ['12:00', '13:00', '14:00'];

var checkinArray = ['12:00', '13:00', '14:00'];

var photosArray = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function generateData() {
  var data = [];

  for (var i = 0; i < 8; i++) {
    var location = {
      x: getRandomInteger(0, 1200),
      y: getRandomInteger(130, 630)
    };

    var object = {
      author: {

        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {

        title: getRandomElement(titleArray),

        address: location.x + ',' + location.y,

        price: getRandomInteger(1000, 1000000),

        type: getRandomElement(typeArray),

        rooms: getRandomInteger(1, 5),

        guests: getRandomInteger(1, 3),

        checkin: getRandomElement(checkinArray),

        checkout: getRandomElement(checkoutArray),

        features: getRandomlengths(featuresArray),

        description: '',

        photos: getRandomElement(photosArray)
      },

      location: location
    };

    data.push(object);
  }
  return data;
}

var generatedObjects = generateData();

var map = document.querySelector('.map')
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var pins = document.querySelector('.map__pins');

function сreatePin(object) {
  var clonedPin = pinTemplate.cloneNode(true);
  var clonedPinStyle = clonedPin.style;
  var sizePin = (50 + 70) / 2;

  // Путь к шаблону кнопки
  clonedPinStyle.left = (object.location.x - sizePin) + 'px';
  clonedPinStyle.top = (object.location.y - sizePin)+ 'px';
  clonedPin.querySelector('img').src = object.author.avatar;
  clonedPin.querySelector('img').alt = object.offer.title;

  return clonedPin;
}

function createFragmentPins(array) {
  var fragmentPin = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragmentPin.appendChild(сreatePin(array[i]));
  }

  return pins.appendChild(fragmentPin);
}

var postFragmentPins = createFragmentPins(generatedObjects);


var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

function сreateCard(object) {
  var clonedCard = cardTemplate.cloneNode(true);
  // var typeHousing =
  //   if (object.offer.type === 'flat') {
  //     typeHousing = 'Квартира';
  //   } else if (object.offer.type === 'bungalo') {
  //       typeHousing = 'Бунгало';
  //   } else if (object.offer.type === 'house') {
  //       typeHousing = 'Дом';
  //   } else if (object.offer.type === 'palace') {
  //       typeHousing = 'Дворец';
  //   } else {
  //     typeHousing = '';
  //   };

  // var typeHousing = switch (object.offer.type) {
  //   case 'flat': 'Квартира';
  //   break;
  //   case 'bungalo': 'Бунгало';
  //   break;

  //   case 'house': 'Дом';
  //   break;

  //   case 'palace': 'Дворец';
  //   break;

  //   default: '';
  //   break;
  // };

  var cloneCardPopupPhotos = cardTemplate.querySelector('.popup__photo').cloneNode(true);

  cloneCardPopupPhotos.src = object.offer.photos;

  clonedCard.querySelector('.popup__title').textContent = object.offer.title;
  clonedCard.querySelector('.popup__text--address').textContent = object.offer.address;
  clonedCard.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';

  // clonedCard.querySelector('.popup__type').textContent = typeHousing;

  clonedCard.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.rooms + ' гостей.';

  clonedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '.';

  // clonedCard.querySelector('.popup__features').textContent = ;

  // clonedCard.querySelector('.popup__description').textContent = object.offer.description;

  clonedCard.querySelector('img').src = object.author.avatar;

  return clonedCard;
}


function createFragmentCards(array) {
  var fragmentCard = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragmentCard.appendChild(сreateCard(array[i]));
  }

  return map.insertBefore(fragmentCard,mapFilters);
}

var postFragmentCards = createFragmentCards(generatedObjects);
