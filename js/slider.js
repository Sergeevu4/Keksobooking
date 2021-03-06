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

    document.addEventListener('mousemove', onPinMainMousemove);
    document.addEventListener('mouseup', onPinMainMouseup);
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
  function onPinMainMousemove(evt) {
    evt.preventDefault();
    if (pinMainMouseMoveCallback) {
      pinMainMouseMoveCallback();
    }

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
  function onPinMainMouseup(evt) {
    evt.preventDefault();
    if (pinMainMouseUpCallback) {
      pinMainMouseUpCallback();
    }

    document.removeEventListener('mousemove', onPinMainMousemove);
    document.removeEventListener('mouseup', onPinMainMouseup);
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
