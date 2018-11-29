'use strict';

// Колличество создаваемых объектов, внутри массива
var NUMBER_CREATED_OBJECTS = 8;

// Цена: минимальное, максимальное значение
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

// Колличество комнат: минимальное, максимальное значение
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

// Колличество гостей: минимальное, максимальное значение
var MIN_GUESTS = 1;
var MAX_GUESTS = 3;

// Размеры метки меток на карте
var SIZE_PIN_WIDTH = 50;
var SIZE_PIN_HEIGHT = 70;

// Размеры фотографий в карточках
var CARDS_PHOTO_WIDTH = '45';
var CARDS_PHOTO_HEIGHT = '40';

// Координаты меток на карте, где X - ширина(px), Y - высота
var MIN_COORDINATE_X = 0;
var MAX_COORDINATE_X = 1200;

var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;

// Перечисление объектов: типы аппартаментов
var TypeArray = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало'
};

// Функция по нахождению случайного элемента.
function getRandomInteger(max, min) {
  min = min || 0;
  return Math.floor(Math.random() * (max - min) + min);
}

// ****************** ДАННЫЕ ДЛЯ ФОРМИРОВАНИЯ МАССИВА ОБЪЕКТОВ *****************

// Функция по созданию случайного заголовка
function getRandomTitle() {
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
  return titleArray[getRandomInteger(titleArray.length, 0)];
}

// Функция по созданию случайного типа аппартаментов
function getRandomType() {
  return Object.keys(TypeArray)[getRandomInteger(Object.keys(TypeArray).length)];
}

// Функция по созданию случайного времени: Регистрация
function getRandomСheckin() {
  var checkinArray = ['12:00', '13:00', '14:00'];
  return checkinArray[getRandomInteger(checkinArray.length, 0)];
}

// Функция по созданию случайного времени: Выселения
function getRandomСheckout() {
  var checkoutArray = ['12:00', '13:00', '14:00'];
  return checkoutArray[getRandomInteger(checkoutArray.length, 0)];
}

// Функция по созданию случайного времени: Выселения
function getRandomFeatures() {
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  return featuresArray.slice(getRandomInteger(featuresArray.length, 0));
}

// Массив адресов фотографий
var photosArray = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


// Функция генерации объектов
function generateData() {
  var data = [];

  for (var i = 0; i < NUMBER_CREATED_OBJECTS; i++) {
    var location = {
      x: getRandomInteger(MAX_COORDINATE_X, MIN_COORDINATE_X),
      y: getRandomInteger(MAX_COORDINATE_Y, MIN_COORDINATE_Y)
    };

    data.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomTitle(),
        address: location.x + ',' + location.y,
        price: getRandomInteger(MAX_PRICE, MIN_PRICE),
        type: getRandomType(),
        rooms: getRandomInteger(MAX_ROOMS, MIN_ROOMS),
        guests: getRandomInteger(MAX_GUESTS, MIN_GUESTS),
        checkin: getRandomСheckin(),
        checkout: getRandomСheckout(),
        features: getRandomFeatures(),
        description: '',
        photos: (photosArray)
      },
      location: location
    });
  }

  return data;
}

// Массив объектов
var generatedObjects = generateData();

// Функция создания пина
function сreatePin(object) {
  var clonedPin = pinTemplate.cloneNode(true);
  var clonedPinStyle = clonedPin.style;

  clonedPinStyle.left = object.location.x - (SIZE_PIN_WIDTH / 2) + 'px';
  clonedPinStyle.top = object.location.y - SIZE_PIN_HEIGHT + 'px';
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

  pins.appendChild(fragmentPin);
}

// Функция создания карточки
function createCard(object) {
  var clonedCard = cardTemplate.cloneNode(true);

  clonedCard.querySelector('.popup__title').textContent = object.offer.title;
  clonedCard.querySelector('.popup__text--address').textContent = object.offer.address;
  clonedCard.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';


  clonedCard.querySelector('.popup__type').textContent = TypeArray[object.offer.type];

  clonedCard.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.rooms + ' гостей.';

  clonedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '.';

  var popupFeaturesList = clonedCard.querySelector('.popup__features');
  popupFeaturesList.innerHTML = '';

  // Цикл по созданию элементов списка (features) в карточках
  if (object.offer.features.length) {
    for (var i = 0; i < object.offer.features.length; i++) {
      var featuresListItem = document.createElement('li');
      featuresListItem.classList.add('popup__feature', 'popup__feature--' + object.offer.features[i]);
      popupFeaturesList.appendChild(featuresListItem);
    }
  } else {
    popupFeaturesList.classList.add('hidden');
  }

  clonedCard.querySelector('.popup__description').textContent = object.offer.description;

  var popupFeaturesPhotos = clonedCard.querySelector('.popup__photos');
  popupFeaturesPhotos.innerHTML = '';

  // Цикл по созданию фотографий в карточках
  for (var j = 0; j < object.offer.photos.length; j++) {
    var cardPhoto = document.createElement('img');
    cardPhoto.classList.add('popup__photo');
    cardPhoto.src = object.offer.photos[j];
    cardPhoto.alt = 'Фотография жилья';
    cardPhoto.width = CARDS_PHOTO_WIDTH;
    cardPhoto.height = CARDS_PHOTO_HEIGHT;
    popupFeaturesPhotos.appendChild(cardPhoto);
  }

  clonedCard.querySelector('img').src = object.author.avatar;

  return clonedCard;
}

// Функция добавления карточки в разметку
function createFirstCard(object) {
  map.insertBefore(object, mapFilters);
}

// Путь к шаблону Пина
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var pins = document.querySelector('.map__pins');

// Путь к шаблону карточки
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var mapFilters = document.querySelector('.map__filters-container');


// Получения первого объекта из сгенерированного массива
var card = createCard(generatedObjects[0]);

// Вызовы функций по созданию Пинов и Карточек
createFragmentPins(generatedObjects);
createFirstCard(card);
