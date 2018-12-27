'use strict';

(function () {

  // Размеры метки меток на карте
  var SIZE_PIN_WIDTH = 50;
  var SIZE_PIN_HEIGHT = 70;

  // Функция создания пина
  function сreatePin(ad) {
    // Путь к шаблону пина
    var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    var clonedPin = pinTemplate.cloneNode(true);
    var clonedPinStyle = clonedPin.style;

    clonedPinStyle.left = ad.location.x - (SIZE_PIN_WIDTH / 2) + 'px';
    clonedPinStyle.top = ad.location.y - SIZE_PIN_HEIGHT + 'px';
    clonedPin.id = ad.id;
    clonedPin.querySelector('img').src = ad.author.avatar;
    clonedPin.querySelector('img').alt = ad.offer.title;

    return clonedPin;
  }

  // Экспорт
  window.pin = {
    сreate: сreatePin
  };
})();
