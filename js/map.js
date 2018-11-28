'use strict';
// Функция получения рандомного значения из заданного интервала
function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

// Функция получения рандомного элемента из массива
function getRandomElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

// Функция получения массива случайной длины
function getRandomlengths(array) {
  return array.slice(getRandomInteger(0, array.length - 1));
}

// Данные для формирования массива объектов
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

// Функция генерации объектов
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

        photos: (photosArray)
      },

      location: location
    };

    data.push(object);
  }
  return data;
}

var generatedObjects = generateData();
// Массив объектов

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var pins = document.querySelector('.map__pins');

// Функция создания пина
function сreatePin(object) {
  var clonedPin = pinTemplate.cloneNode(true);
  var clonedPinStyle = clonedPin.style;
  var sizePinWidth = 50;
  var sizePinHeight = 70;

  // Путь к шаблону кнопки
  clonedPinStyle.left = object.location.x - (sizePinWidth / 2) + 'px';
  clonedPinStyle.top = object.location.y - sizePinHeight + 'px';
  clonedPin.querySelector('img').src = object.author.avatar;
  clonedPin.querySelector('img').alt = object.offer.title;

  return clonedPin;
}

// Функция добавления пинов в разметку через фрагмент
function createFragmentPins(array) {
  var fragmentPin = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragmentPin.appendChild(сreatePin(array[i]));
  }

  // return pins.appendChild(fragmentPin);
  pins.appendChild(fragmentPin);
}

// var postFragmentPins = createFragmentPins(generatedObjects);
createFragmentPins(generatedObjects);


var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
// var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

// Функция создания карточки объявления
function createCard(object) {
  var clonedCard = cardTemplate.cloneNode(true);


  clonedCard.querySelector('.popup__title').textContent = object.offer.title;
  clonedCard.querySelector('.popup__text--address').textContent = object.offer.address;
  clonedCard.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';

  var typeHousing = '';

  switch (object.offer.type) {
    case 'flat':
      typeHousing = 'Квартира';
      break;

    case 'bungalo':
      typeHousing = 'Бунгало';
      break;

    case 'house':
      typeHousing = 'Дом';
      break;

    case 'palace':
      typeHousing = 'Дворец';
      break;

    default:
      typeHousing = '';
      break;
  }

  clonedCard.querySelector('.popup__type').textContent = typeHousing;

  clonedCard.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.rooms + ' гостей.';

  clonedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '.';


  var popupFeaturesList = clonedCard.querySelector('.popup__features');
  popupFeaturesList.innerHTML = '';

  for (var i = 0; i < object.offer.features.length; i++) {
    var featuresListItem = document.createElement('li');
    featuresListItem.classList.add('popup__feature', 'popup__feature--' + object.offer.features[i]);
    popupFeaturesList.appendChild(featuresListItem);
  }

  clonedCard.querySelector('.popup__description').textContent = object.offer.description;

  var popupFeaturesPhotos = clonedCard.querySelector('.popup__photos');
  popupFeaturesPhotos.innerHTML = '';


  for (var j = 0; j < object.offer.photos.length; j++) {
    var cardPhoto = document.createElement('img');
    cardPhoto.classList.add('popup__photo');
    cardPhoto.src = object.offer.photos[j];
    cardPhoto.alt = 'Фотография жилья';
    cardPhoto.width = '45';
    cardPhoto.height = '40';
    popupFeaturesPhotos.appendChild(cardPhoto);
  }

  // CARDS_PHOTO_WIDTH = '45';
  // CARDS_PHOTO_HEIGHT = '40';

  clonedCard.querySelector('img').src = object.author.avatar;

  return clonedCard;
  // map.insertBefore(clonedCard, mapFilters);
}

var card = createCard(generatedObjects[0]);

function createFirstCard(object) {
  map.insertBefore(object, mapFilters);

}

createFirstCard(card);

