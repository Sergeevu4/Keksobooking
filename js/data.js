'use strict';
// ****************** ДАННЫЕ ДЛЯ ФОРМИРОВАНИЯ МАССИВА ОБЪЕКТОВ *****************
(function () {

  // Количество создаваемых объектов, внутри массива
  var NUMBER_CREATED_OBJECTS = 8;

  // Цена: минимальное, максимальное значение
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  // Количество комнат: минимальное, максимальное значение
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  // Количество гостей: минимальное, максимальное значение
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 3;

  // Координаты меток на карте, где X - ширина(px), Y - высота
  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = 1200;

  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  // Перечисление объектов: типы апартаментов
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

  // Функция по созданию случайного типа апартаментов
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

  // Экспорт
  window.data = {
    generatedObjects: generatedObjects,
    typeArray: TypeArray
  };
})();
