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
      location: location,
      id: 'map__pin_id' + (i + 1)
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
  clonedPin.id = object.id;
  clonedPin.querySelector('img').src = object.author.avatar;
  clonedPin.querySelector('img').alt = object.offer.title;

  return clonedPin;
}

// Функция добавления пинов в разметку через фрагмент
function addPins(array) {
  var fragmentPin = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragmentPin.appendChild(сreatePin(array[i]));
  }

  pinsContainerMap.appendChild(fragmentPin);
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
function addCard(object) {
  map.insertBefore(object, mapFilters);
}

// Путь к шаблону Пина
var map = document.querySelector('.map');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// Контейнер Div Пинов на карте
var pinsContainerMap = document.querySelector('.map__pins');

// Путь к шаблону карточки
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

// var mapFilters = document.querySelector('.map__filters-container');

// Получения первого объекта из сгенерированного массива
// var card = createCard(generatedObjects[0]);

// Вызовы функций по созданию Пинов и Карточек
// createFragmentPins(generatedObjects);
// createFirstCard(card);


// ************************** ЗАДАНИЕ 4.1 ***********************************

// Контейнер формы фильтрации
var mapFilters = document.querySelector('.map__filters-container');

// Форма фильтрации объявлений (коллекция элементов формы)
var formFiltersAds = mapFilters.querySelector('.map__filters');
var formFiltersAdsSelect = formFiltersAds.querySelectorAll('select');

// Все теги fieldset на стайте
var formFieldset = document.querySelectorAll('fieldset');

// Главный Pin
var pinMain = document.querySelector('.map__pin--main');

// Все пины на карте (коллекция), кроме главного Пина
// var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

// Форма объявлений
var formAds = document.querySelector('.ad-form');

// Адрес в форме объявлений
var addressFormAds = formAds.querySelector('#address');
// addressFormAds.readOnly = true;


// Самый короткий вариант реализации функции переключения состояния элементов в форме
function toggleForms(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = true;

    if (!map.classList.contains('map--faded') || !array[i].disabled) {
      array[i].disabled = false;
    }
  }
}

// Вызов функции переключения состояния активности полей формы
toggleForms(formFiltersAdsSelect);
toggleForms(formFieldset);

// Высота острия главного пина
var PIN_MAIN_HEIGHT = 19;

// Функция подсчета координат для Основного пина
function getCoordinates() {
  var coordinates = {
    x: parseInt(pinMain.style.left, 10) + pinMain.offsetWidth / 2,
    y: parseInt(pinMain.style.top, 10) + pinMain.offsetHeight / 2
  };

  if (!map.classList.contains('map--faded')) {
    coordinates.y = parseInt(pinMain.style.top, 10) + pinMain.offsetHeight + PIN_MAIN_HEIGHT;
  }

  return coordinates;
}

// Объект с координатами
var coords = getCoordinates();

// Функция внесения координат в адрес input
function getАddressFormAds(object) {
  addressFormAds.value = (object.x + ',' + object.y);
}

getАddressFormAds(coords);

// Все пины на карте (коллекция), кроме главного Пина
// var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

// Функция обработчик: по нажатию на пин => отрисовка карточки в HTML
function onPinClick(evt) {
  var pinsClick = evt.target.closest('.map__pin:not(.map__pin--main)');

  if (pinsClick) {
    var currentInfo = generatedObjects.filter(function (item) {
      return item.id === pinsClick.id;
    });

    // Закрытие перед отрисовкой
    closeCard();

    // Отрисовка
    addCard(createCard(currentInfo[0]));

    // Закрытие карточки по кнопке
    var closeCardButton = document.querySelector('.popup__close');
    closeCardButton.addEventListener('click', closeCard);
  }
}

// Функция закрытия карточек + Проверка существует ли она вообще, перед закрытием
function closeCard() {
  var card = document.querySelector('.map__card');
  if (card) {
    map.removeChild(document.querySelector('.map__card'));
  }
}

// Функция обработчика нажатия по Escape
function onEscPress(evt) {
  if (evt.code === 'Escape') {
    closeCard();
  }
}

// Функция обработчика нажатия на главный Pin
function onPinMainMouseUp() {
  map.classList.remove('map--faded');
  formAds.classList.remove('ad-form--disabled');
  getАddressFormAds(getCoordinates());
  addPins(generatedObjects);

  toggleForms(formFiltersAdsSelect);
  toggleForms(formFieldset);

  setTimeout(function () {
    pinsContainerMap.addEventListener('click', onPinClick);
  }, 0);
}

// Обработчик события по главному Pin
pinMain.addEventListener('mouseup', onPinMainMouseUp);


// Обработчик события клика и последующего закрытия карточки
document.addEventListener('keydown', onEscPress);

// ************************Задание 4.2**************************************

// Поля формы в HTML тип апартаментов и цена
var typeApartmentAds = formAds.querySelector('#type');
var priceApartmentAds = formAds.querySelector('#price');

// Объект тип апартаментов и цена
var TypePrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

// Функция обработчика событий синхронизация полей(тип апартаментов и цены)
function onTypeApartmentAdsChange() {
  var currentTypeApartment = typeApartmentAds.value.toUpperCase();
  var currentMinPrice = TypePrice[currentTypeApartment];
  priceApartmentAds.placeholder = currentMinPrice;
  priceApartmentAds.min = currentMinPrice;
}

// Обработчик события изменению в поле формы: Тип апартаментов
typeApartmentAds.addEventListener('change', onTypeApartmentAdsChange);


// Поля формы время заезда и время выезда
var timeInApartmentAds = formAds.querySelector('#timein');
var timeOutApartmentAds = formAds.querySelector('#timeout');


// Функция обработчика событий синхронизация полей(время выезда = времени въезда)
function onTimeInApartmentAdsСhange() {
  timeOutApartmentAds.value = timeInApartmentAds.value;
}

// Функция обработчика событий синхронизация полей(время въезда = времени въезда)
function onTimeOutApartmentAdsСhange() {
  timeInApartmentAds.value = timeOutApartmentAds.value;
}

// Обработчики события по изменению в поле формы: время заезда, время выезда
timeInApartmentAds.addEventListener('change', onTimeInApartmentAdsСhange);
timeOutApartmentAds.addEventListener('change', onTimeOutApartmentAdsСhange);


// Поля формы Кол-во комнат и Кол-во мест
var roomApartmentAds = formAds.querySelector('#room_number');
var capacityApartmentAds = formAds.querySelector('#capacity');

var TARGET_INDEX = 0;

var ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

function onRoomApartmentAdsСhange() {
  if (capacityApartmentAds.options.length > TARGET_INDEX) {
    [].forEach.call(capacityApartmentAds.options, function (item) {
      item.selected = (ROOMS_CAPACITY[roomApartmentAds.value][TARGET_INDEX] === item.value) ? true : false;
      item.hidden = (ROOMS_CAPACITY[roomApartmentAds.value].indexOf(item.value) >= TARGET_INDEX) ? false : true;
    });
  }
}

roomApartmentAds.addEventListener('change', onRoomApartmentAdsСhange);


// // Поля формы Кол-во комнат и Кол-во мест
// var roomApartmentAds = formAds.querySelector('#room_number');
// var capacityApartmentAds = formAds.querySelector('#capacity');


// function onRoomApartmentAdsСhange(evt) {
//   var curentRoomApartment = parseInt(roomApartmentAds.value, 10);
//   var curentCapacityApartment = parseInt(capacityApartmentAds.value, 10);
//   var errorMessage = capacityApartmentAds.setCustomValidity('');

//   switch (curentRoomApartment) {
//     case 1:
//       if (curentRoomApartment !== curentCapacityApartment) {
//       errorMessage = 'Сообщение об ошибке 1';
//       // capacityApartmentAds.setCustomValidity('Сообщение об ошибке 1');
//    }
//     break;

//     case 2:
//       if (curentCapacityApartment > 2 || curentCapacityApartment < 1) {
//         errorMessage = 'Сообщение об ошибке 2';
//         // capacityApartmentAds.setCustomValidity('Сообщение об ошибке 2');
//      }
//       break;

//     case 3:
//       if (curentCapacityApartment > 3 || curentCapacityApartment < 1 ) {
//         errorMessage = 'Сообщение об ошибке 3';
//         // capacityApartmentAds.setCustomValidity('Сообщение об ошибке 3');
//      }
//     break;

//     case 100:
//       if (curentCapacityApartment !== 0) {
//         errorMessage = 'Сообщение об ошибке 4';
//         // capacityApartmentAds.setCustomValidity('Сообщение об ошибке 4');
//      }
//     break;

//     default:
//     errorMessage = '';
//     break;
//   }
//   capacityApartmentAds.setCustomValidity(errorMessage);
// }

// roomApartmentAds.addEventListener('change', onRoomApartmentAdsСhange);
