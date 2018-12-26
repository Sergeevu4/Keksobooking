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

  // Форма фильтрации объявлений
  var formFilters = document.querySelector('.map__filters');

  // Форма объявлений
  var formAd = document.querySelector('.ad-form');

  // Адрес в форме объявлений
  var addressformAd = formAd.querySelector('#address');

  // Поля формы в HTML тип апартаментов и цена
  var typeApartmentAd = formAd.querySelector('#type');
  var priceApartmentAd = formAd.querySelector('#price');

  // Поля формы время заезда и время выезда
  var timeInApartmentAd = formAd.querySelector('#timein');
  var timeOutApartmentAd = formAd.querySelector('#timeout');

  // Поля формы Кол-во комнат и Кол-во мест
  var roomApartmentAd = formAd.querySelector('#room_number');
  var capacityApartmentAd = formAd.querySelector('#capacity');

  // Кнопка сброса в неактивное состояние сайта
  var buttonResetFormSite = formAd.querySelector('.ad-form__reset');

  // Callback переменная дезактивации страницы
  var successSubmitCallback = null;

  // Вызов функции переключения состояния активности полей формы
  toggleForm(formFilters);
  toggleForm(formAd);

  // Объект с координатами
  writeАddressformAd(window.map.getCoordinates());

  // Обработчики события по изменению в поле формы: время заезда, время выезда
  timeInApartmentAd.addEventListener('change', onTimeInApartmentAdСhange);
  timeOutApartmentAd.addEventListener('change', onTimeOutApartmentAdСhange);

  // Обработчик события по клику на кнопку сброса, очищается вся страница сайта
  buttonResetFormSite.addEventListener('click', onResetFormSite);

  // Обработчик события изменению в поле формы: Тип апартаментов
  typeApartmentAd.addEventListener('change', onTypeApartmentAdChange);

  // Обработчики события по изменению в поле формы: «Количество комнат» синхронизировано с полем «Количество мест»
  roomApartmentAd.addEventListener('change', onRoomApartmentAdСhange);


  // Вспомогательная функция переключения состояния элементов в формы (принимает внутрь форму)
  function toggleForm(form) {
    var formElements = form.children;
    Array.from(formElements).forEach(function (elem) {
      elem.disabled = !elem.disabled;
    });
  }

  // (Handler) Функция обработчика событий синхронизация полей(тип апартаментов и цены)
  function onTypeApartmentAdChange() {
    var currentTypeApartment = typeApartmentAd.value.toUpperCase();
    var currentMinPrice = TypePrice[currentTypeApartment];
    priceApartmentAd.placeholder = currentMinPrice;
    priceApartmentAd.min = currentMinPrice;
  }


  // (Handler) Функция обработчика событий синхронизация полей(время выезда = времени въезда)
  function onTimeInApartmentAdСhange() {
    timeOutApartmentAd.value = timeInApartmentAd.value;
  }

  // (Handler) Функция обработчика событий синхронизация полей(время въезда = времени въезда)
  function onTimeOutApartmentAdСhange() {
    timeInApartmentAd.value = timeOutApartmentAd.value;
  }

  // (Handler) Функция обработчика событий в поле формы: «Количество комнат» синхронизировано с полем «Количество мест»
  function onRoomApartmentAdСhange() {
    if (capacityApartmentAd.options.length > TARGET_INDEX) {
      [].forEach.call(capacityApartmentAd.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomApartmentAd.value][TARGET_INDEX] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomApartmentAd.value].indexOf(item.value) >= TARGET_INDEX) ? false : true;
      });
    }
  }

  // Функция внесения координат в адрес input
  function writeАddressformAd(object) {
    addressformAd.value = (object.x + ',' + object.y);
  }

  // Функция input очищения заполненной информации полях формы
  function resetformAd() {
    formAd.reset();
  }


  // Функция отправки данных формы на сервер
  formAd.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(formAd), function () {
      successSubmitCallback();
      window.message.showSuccessMessage();
    }, window.message.showErrorMessage);
    evt.preventDefault();
  });


  // (Handler) Функция полного сбороса страницы в неактивное состояние
  function onResetFormSite() {
    window.map.toggleSiteState();

    window.map.closeCard();
    window.map.removePins();

    window.map.resetMainPinPosition();

    writeАddressformAd(window.map.getCoordinates());
    resetformAd();
  }

  // Функция callback - которая получит функцию дезактивации страницы после успешной отправки сообщения.
  function setSuccessSubmitCallback(callback) {
    successSubmitCallback = callback;
  }


  // Экспорт
  window.formAd = {
    toggle: toggleForm,
    writeАddressformAd: writeАddressformAd,
    resetformAd: resetformAd,
    onResetFormSite: onResetFormSite,
    setSuccessSubmitCallback: setSuccessSubmitCallback
  };

})();
