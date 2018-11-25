'use strict';

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

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

        avatar: 'img/avatars/user0' + i + '.png'
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

// console.log(generateData());
// var generatedObjects = generateData();

var map = document.querySelector('.map')
map.classList.remove('map--faded');

var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

function renderPin (array) {
  var addLabel = pin.cloneNode(true);
  var addLabelPin = addLabel.querySelector('.map__pin').style;
  // Путь к шаблону кнопки

  addLabelPin.left = array.object.offer.address.location.x;
  addLabelPin.top = array.object.offer.address.location.y;
  addLabelPin.src = array.object.author.avatar;
  addLabelPin.alt = array.object.offer.title;

  return addLabel;
}

var fragmentPin = document.createDocumentFragment();

for (var i = 0; i < generateData.length; i++) {
  fragmentPin.appendChild(renderPin(generateData([i])));
}

  pin.appendChild(fragmentPin);


// for (var i = 0; i < generateData.length; i++) {
//   var addLabel = pin.cloneNode(true);
//   var addLabelPin = addLabel.querySelector('.map__pin').style;
//   // Путь к шаблону кнопки

//   addLabelPin.left = generateData[i].object.offer.address.location.x;
//   addLabelPin.top = generateData[i].object.offer.address.location.y;
//   addLabelPin.src = generateData[i].object.author.avatar;
//   addLabelPin.alt = generateData[i].object.offer.title;

//   pin.appendChild(addLabel);
// }
