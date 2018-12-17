'use strict';

(function () {

  // Размеры метки меток на карте
  var SIZE_PIN_WIDTH = 50;
  var SIZE_PIN_HEIGHT = 70;

  // Путь к шаблону пина
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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

  // Экспорт
  window.pin = {
    сreate: сreatePin
  };
})();
