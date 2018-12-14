'use strict';

(function () {

  // Размеры метки меток на карте
  var SIZE_PIN_WIDTH = 50;
  var SIZE_PIN_HEIGHT = 70;

  // Путь к шаблону пина
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  // Контейнер Div Пинов на карте
  var pinsContainerMap = document.querySelector('.map__pins');

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

  // Экспорт
  window.pin = {
    addPins: addPins
  };
})();
