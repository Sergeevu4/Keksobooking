'use strict';

(function () {

  // Ограничения по вертикале движения главного пина
  var MIN_SHIFT_TOP = 130;
  var MAX_SHIFT_TOP = 630;

  // Ограничения по горизонтале движения главного пина
  var MIN_SHIFT_LEFT = 0;
  var MAX_SHIFT_LEFT = 1200;

  // Высота острия главного пина
  var PIN_MAIN_HEIGHT_POINTER = 19;

  // Главный Pin
  var pinMain = document.querySelector('.map__pin--main');
  pinMain.style.zIndex = '1000';

  /*  // Путь к главному пространству - карта(section) ++
  var map = document.querySelector('.map');

  // Контейнер Div Пинов на карте +
  var pinsContainerMap = document.querySelector('.map__pins');

  // Форма объявлений +
  var formAds = document.querySelector('.ad-form');

  // Форма фильтрации все теги select (коллекция элементов формы) +
  var formFiltersAdsSelect = document.querySelectorAll('select');

  // Все теги fieldset на стайте +
  var formFieldset = document.querySelectorAll('fieldset'); */

  // Объявления пустого объекта, стартовая точка координат при Drag'n'Drop
  var startCoords = {};

  // Начальное состояние функций: (защита) которые принимают callback - для того, чтобы в случае возникнование ошибки, условие бы не сработало внутри обработчиков
  var pinMainMouseUpCallback = null;
  var pinMainMouseMoveCallback = null;

  // Обработчик Drag'n'Drop
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  });

  // Функция: условие ограничения для главного пина при перемещении (mousemove)
  function limitPinMainPosition(shift) {
    if (pinMain.offsetTop + shift.y > MAX_SHIFT_TOP - PIN_MAIN_HEIGHT_POINTER - pinMain.offsetHeight) {
      pinMain.style.top = (MAX_SHIFT_TOP - PIN_MAIN_HEIGHT_POINTER - pinMain.offsetHeight) + 'px';
    }

    if (pinMain.offsetTop + shift.y < (MIN_SHIFT_TOP - PIN_MAIN_HEIGHT_POINTER - pinMain.offsetHeight)) {
      pinMain.style.top = (MIN_SHIFT_TOP - PIN_MAIN_HEIGHT_POINTER - pinMain.offsetHeight) + 'px';
    }

    if (pinMain.offsetLeft + shift.x < (MIN_SHIFT_LEFT - pinMain.offsetWidth / 2)) {
      pinMain.style.left = (MIN_SHIFT_LEFT - pinMain.offsetWidth / 2) + 'px';
    }

    if (pinMain.offsetLeft + shift.x > (MAX_SHIFT_LEFT - pinMain.offsetWidth / 2)) {
      pinMain.style.left = (MAX_SHIFT_LEFT - pinMain.offsetWidth / 2) + 'px';
    }
  }

  // (Handler) Функция обработчика события mousemove
  function onPinMainMouseMove(evt) {
    evt.preventDefault();
    if (pinMainMouseMoveCallback) {
      pinMainMouseMoveCallback();
    }

    /* // импорт c map - window.map
        window.map.writeАddressFormAds(window.map.getCoordinates());
        Убрал так как вставка написанных координат не всегда потребуется в других слайдерах
    */

    var shift = {
      x: evt.clientX - startCoords.x,
      y: evt.clientY - startCoords.y
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    pinMain.style.top = (pinMain.offsetTop + shift.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft + shift.x) + 'px';

    limitPinMainPosition(shift);
  }

  // (Handler) Функция обработчика события mouseup - через callback
  function onPinMainMouseUp(evt) {
    evt.preventDefault();
    if (pinMainMouseUpCallback) {
      pinMainMouseUpCallback();
    }

    /* Вся внешняя логика

      if (map.classList.contains('map--faded')) {
      // Импорт с data -  window.data,   window.pin
      window.map.addPins(window.data.generatedObjects);
      map.classList.remove('map--faded');
      formAds.classList.remove('ad-form--disabled');

      // импорт c map - window.map
      window.map.writeАddressFormAds(window.map.getCoordinates());

      // импорт window.form.toggleForms
      window.form.toggleForms(formFiltersAdsSelect);
      window.form.toggleForms(formFieldset);
    }

    // импорт c map - window.map
    pinsContainerMap.addEventListener('click', window.map.onPinClick); */

    document.removeEventListener('mousemove', onPinMainMouseMove);
    document.removeEventListener('mouseup', onPinMainMouseUp);
  }

  // Функция callback - рассчета + внесения координат в адрес input
  function setPinMainMouseMoveCallback(callback) {
    pinMainMouseMoveCallback = callback;
  }

  // Функция callback - которая активирует страницу
  function setPinMainMouseUpCallback(callback) {
    pinMainMouseUpCallback = callback;
  }

  // Экспорт функций которые вернут callback из main
  window.slider = {
    setPinMainMouseUpCallback: setPinMainMouseUpCallback,
    setPinMainMouseMoveCallback: setPinMainMouseMoveCallback
  };
})();
