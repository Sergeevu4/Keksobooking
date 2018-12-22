'use strict';

(function () {

  var TARGET_INDEX = 0;

  // Объект из массивов для сихронизации комнат с полем мест
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  // Объект тип апартаментов и цена
  var TypePrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  // Путь к главному пространству - карта(section)
  var map = document.querySelector('.map');

  // Контейнер формы фильтрации
  var mapFilters = document.querySelector('.map__filters-container');

  // Форма фильтрации объявлений
  var formFiltersAds = mapFilters.querySelector('.map__filters');

  // Форма фильтрации все теги select (коллекция элементов формы)
  var formFiltersAdsSelect = formFiltersAds.querySelectorAll('select');

  // Все теги fieldset на стайте
  var formFieldset = document.querySelectorAll('fieldset');

  // Форма объявлений
  var formAds = document.querySelector('.ad-form');

  // Адрес в форме объявлений
  var addressFormAds = formAds.querySelector('#address');

  // Поля формы в HTML тип апартаментов и цена
  var typeApartmentAds = formAds.querySelector('#type');
  var priceApartmentAds = formAds.querySelector('#price');

  // Поля формы время заезда и время выезда
  var timeInApartmentAds = formAds.querySelector('#timein');
  var timeOutApartmentAds = formAds.querySelector('#timeout');

  // Поля формы Кол-во комнат и Кол-во мест
  var roomApartmentAds = formAds.querySelector('#room_number');
  var capacityApartmentAds = formAds.querySelector('#capacity');

  // Кнопка сброса в неактивное состояние сайта
  var buttonResetFormSite = formAds.querySelector('.ad-form__reset');

  // Callback переменная дезактивации страницы
  var deactivatePageCallback = null;

  // Функция переключения состояния элементов в формы (Самый короткий вариант реализации)
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

  // (Handler) Функция обработчика событий синхронизация полей(тип апартаментов и цены)
  function onTypeApartmentAdsChange() {
    var currentTypeApartment = typeApartmentAds.value.toUpperCase();
    var currentMinPrice = TypePrice[currentTypeApartment];
    priceApartmentAds.placeholder = currentMinPrice;
    priceApartmentAds.min = currentMinPrice;
  }

  // Обработчик события изменению в поле формы: Тип апартаментов
  typeApartmentAds.addEventListener('change', onTypeApartmentAdsChange);


  // (Handler) Функция обработчика событий синхронизация полей(время выезда = времени въезда)
  function onTimeInApartmentAdsСhange() {
    timeOutApartmentAds.value = timeInApartmentAds.value;
  }

  // (Handler) Функция обработчика событий синхронизация полей(время въезда = времени въезда)
  function onTimeOutApartmentAdsСhange() {
    timeInApartmentAds.value = timeOutApartmentAds.value;
  }

  // Обработчики события по изменению в поле формы: время заезда, время выезда
  timeInApartmentAds.addEventListener('change', onTimeInApartmentAdsСhange);
  timeOutApartmentAds.addEventListener('change', onTimeOutApartmentAdsСhange);


  // (Handler) Функция обработчика событий в поле формы: «Количество комнат» синхронизировано с полем «Количество мест»
  function onRoomApartmentAdsСhange() {
    if (capacityApartmentAds.options.length > TARGET_INDEX) {
      [].forEach.call(capacityApartmentAds.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomApartmentAds.value][TARGET_INDEX] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomApartmentAds.value].indexOf(item.value) >= TARGET_INDEX) ? false : true;
      });
    }
  }

  // Обработчики события по изменению в поле формы: «Количество комнат» синхронизировано с полем «Количество мест»
  roomApartmentAds.addEventListener('change', onRoomApartmentAdsСhange);

  // Функция внесения координат в адрес input
  function writeАddressFormAds(object) {
    addressFormAds.value = (object.x + ',' + object.y);
  }

  // Функция input очищения заполненной информации полях формы
  function resetFormAds() {
    formAds.reset();
  }


  // Функция отправки данных формы на сервер
  formAds.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(formAds), function () {
      deactivatePageCallback();
      window.message.showSuccessMessage();
    }, window.message.showErrorMessage);
    evt.preventDefault();
  });


  // Функция полного сбороса страницы в неактивное состояние
  function onResetFormSite() {
    window.map.toggleSiteState();

    toggleForms(formFiltersAdsSelect);
    toggleForms(formFieldset);

    window.map.closeCard();
    window.map.removePins();

    window.map.resetMainPinPosition();

    writeАddressFormAds(window.map.getCoordinates());
    resetFormAds();
  }

  // Обработчик события по клику на кнопку сброса, очищается вся страница сайта
  buttonResetFormSite.addEventListener('click', onResetFormSite);


  // Объект с координатами
  // Импорт window.map
  writeАddressFormAds(window.map.getCoordinates());


  // Функция callback - которая получит функцию дезактивации страницы после успешной отправки сообщения.
  function setDeactivatePageCallback(callback) {
    deactivatePageCallback = callback;
  }


  // Экспорт
  window.form = {
    toggleForms: toggleForms,
    writeАddressFormAds: writeАddressFormAds,
    resetFormAds: resetFormAds,
    onResetFormSite: onResetFormSite,
    setDeactivatePageCallback: setDeactivatePageCallback
  };

})();
