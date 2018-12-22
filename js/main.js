'use strict';
(function () {

  // Путь к главному пространству - карта(section) ++
  var map = document.querySelector('.map');

  // Форма фильтрации все теги select (коллекция элементов формы) +
  var formFiltersAdsSelect = document.querySelectorAll('select');

  // Все теги fieldset на стайте +
  var formFieldset = document.querySelectorAll('fieldset');

  // Функция активации страницы в mouseup (callback)
  function activatePage() {

    // Функция callback получает данные от сервера и отрисовывает их при активации страницы + записывает в них id + вызывает функцию arrayWithId которая отправляет массив в map
    window.backend.load(function (array) {
      var arrayWithId = setId(array);
      window.map.addPins(arrayWithId);
      window.map.setDataArray(arrayWithId);
    }, window.message.showErrorMessage);

    window.map.toggleSiteState();

    // импорт c form - window.map (рассчета + внесения координат в адрес input) - при активации страницы, с учетом острия (асинхронно)
    window.form.writeАddressFormAds(window.map.getCoordinates());

    // импорт window.form.toggleForms
    window.form.toggleForms(formFiltersAdsSelect);
    window.form.toggleForms(formFieldset);
  }


  // Функция дезактивации страницы
  function deactivatePage() {
    window.form.onResetFormSite();
  }

  // Функция по добавлению id в массив с объектами полученный c сервера
  function setId(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].id = 'map__pin_id' + (i + 1);
    }
    return array;
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


  // Функция передачи callback (дезактивация страницы) при успешной отправки формы
  window.form.setDeactivatePageCallback(function () {
    deactivatePage();
  });

})();
