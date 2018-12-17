'use strict';
(function () {

  // Путь к главному пространству - карта(section) ++
  var map = document.querySelector('.map');

  // Контейнер Div Пинов на карте +
  var pinsContainerMap = document.querySelector('.map__pins');

  // Форма объявлений +
  var formAds = document.querySelector('.ad-form');

  // Форма фильтрации все теги select (коллекция элементов формы) +
  var formFiltersAdsSelect = document.querySelectorAll('select');

  // Все теги fieldset на стайте +
  var formFieldset = document.querySelectorAll('fieldset');


  // Функция активации страницы в mouseup (callback)
  function activatePage() {
    // Импорт с data - window.map,  window.data
    window.map.addPins(window.data.generatedObjects);
    map.classList.remove('map--faded');
    formAds.classList.remove('ad-form--disabled');

    // импорт c form - window.map (рассчета + внесения координат в адрес input) - при активации страницы, с учетом острия (асинхронно)
    window.form.writeАddressFormAds(window.map.getCoordinates());

    // импорт window.form.toggleForms
    window.form.toggleForms(formFiltersAdsSelect);
    window.form.toggleForms(formFieldset);

    // импорт c map - window.map
    pinsContainerMap.addEventListener('click', window.map.onPinClick);
  }

  // Функция передачи callback (активации страницы)
  window.slider.setPinMainMouseUpCallback(function () {
    if (map.classList.contains('map--faded')) {
      activatePage();
    }
  });

  // Функция передачи callback (рассчета + внесения координат в адрес input) при каждом движении курсора (асинхронно)
  window.slider.setPinMainMouseMoveCallback(function () {
    window.form.writeАddressFormAds(window.map.getCoordinates());
  });

})();
