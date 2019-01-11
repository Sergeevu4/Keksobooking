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

  // Объект: тип апартаментов и цена
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
  var priceAd = formAd.querySelector('#price');

  // Поля формы время заезда и время выезда
  var timeInApartmentAd = formAd.querySelector('#timein');
  var timeOutApartmentAd = formAd.querySelector('#timeout');

  // Поля формы Кол-во комнат и Кол-во мест
  var roomApartmentAd = formAd.querySelector('#room_number');
  var capacityApartmentAd = formAd.querySelector('#capacity');

  // Кнопка сброса в неактивное состояние сайта
  var resetButtonAd = formAd.querySelector('.ad-form__reset');

  // input для загрузки Аватара
  var avatarInput = formAd.querySelector('#avatar');

  // Картинка Аватар (img)
  var avatarAd = formAd.querySelector('.ad-form-header__preview img');

  // input для загрузки Картинок
  var imagesInput = formAd.querySelector('#images');

  // Блок (div) в котором будут размещены картинки
  var imagesContainer = formAd.querySelector('.ad-form__photo');

  // Заголовок объявления
  var titleAd = formAd.querySelector('#title');

  // Кнопка отправки формы
  var submitButtonAd = formAd.querySelector('.ad-form__submit');

  // Callback переменная дезактивации страницы
  var successSubmitCallback = null;

  var resetFormCallback = null;

  // Вызов функции переключения состояния активности полей формы
  toggleForm(formFilters);
  toggleForm(formAd);

  // Объект с координатами
  writeАddressFormAd(window.map.getCoordinates());

  // Вызов функции сихронизации типа жилья и стоимости
  setPriceParameters();

  // Функция добавления обработчиков событий в момент активации страницы
  function addHandlers() {
    // Обработчики события по изменению в поле формы: время заезда, время выезда
    timeInApartmentAd.addEventListener('change', onTimeInApartmentAdСhange);
    timeOutApartmentAd.addEventListener('change', onTimeOutApartmentAdСhange);

    // Обработчик события изменению в поле формы: Тип апартаментов
    typeApartmentAd.addEventListener('change', onTypeApartmentAdChange);

    // Обработчики события по изменению в поле формы: «Количество комнат» синхронизировано с полем «Количество мест»
    roomApartmentAd.addEventListener('change', onRoomApartmentAdСhange);

    // Обработчик отправки формы на сервер
    formAd.addEventListener('submit', onFormAdSubmit);

    // Обработчик события по клику на кнопку сброса, очищается вся страница сайта
    resetButtonAd.addEventListener('click', onResetButtonClick);

    // Обработчик события по клику на кнопку отправки, для проверки валидности формы
    submitButtonAd.addEventListener('click', onSubmitButtonAdclick);

    // Обработчик события проверки валидности заголовка объявления
    titleAd.addEventListener('input', onTitleAdInput);

    // Обработчик события проверки валидности на поле стоимости апартаментов
    priceAd.addEventListener('input', onPriceApartmentAdInput);
  }

  // Функция удаления обработчиков событий в момент дезактивации страницы
  function removeHandlers() {
    timeInApartmentAd.removeEventListener('change', onTimeInApartmentAdСhange);
    timeOutApartmentAd.removeEventListener('change', onTimeOutApartmentAdСhange);
    typeApartmentAd.removeEventListener('change', onTypeApartmentAdChange);
    roomApartmentAd.removeEventListener('change', onRoomApartmentAdСhange);
    formAd.removeEventListener('submit', onFormAdSubmit);
    resetButtonAd.removeEventListener('click', onResetButtonClick);
    submitButtonAd.removeEventListener('click', onSubmitButtonAdclick);
    titleAd.removeEventListener('input', onTitleAdInput);
    priceAd.removeEventListener('input', onPriceApartmentAdInput);
  }


  // Функция активация превью в форме объявления
  function activatePreview() {
    // Вызов функции превью для аватара avatarAd (img)
    window.preview.add(avatarInput, avatarAd);
    // Вызов функции превью для нескольких изображений imagesContainer(div)
    window.preview.add(imagesInput, imagesContainer);
  }

  // Функция по удалению обработчиков превью в форме объявления
  function deactivatePreview() {
    window.preview.remove(avatarInput);
    window.preview.remove(imagesInput);
  }


  // Вспомогательная функция переключения состояния элементов в формы (принимает внутрь форму)
  function toggleForm(form) {
    var formElements = form.children;
    Array.from(formElements).forEach(function (elem) {
      elem.disabled = !elem.disabled;
    });
  }

  // Функция отвечающая за синхронизация полей(тип апартаментов и цены)
  function setPriceParameters() {
    var currentTypeApartment = typeApartmentAd.value.toUpperCase();
    var currentMinPrice = TypePrice[currentTypeApartment];
    priceAd.placeholder = currentMinPrice;
    priceAd.min = currentMinPrice;
  }

  // (Handler) Функция обработчика событий синхронизация полей(тип апартаментов и цены)
  function onTypeApartmentAdChange() {
    setPriceParameters();
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
  function writeАddressFormAd(object) {
    addressformAd.value = (object.x + ',' + object.y);
  }

  // Функция input очищения заполненной информации полях формы
  function resetFormAd() {
    formAd.reset();
  }

  // Функция проверки валидности полей, добавление красной рамки, при невалидном состоянии поля.
  function validateForm() {
    Array.from(arguments).forEach(function (input) {
      input.style.cssText = !input.checkValidity() ? 'border: 2px solid red;' : '';
    });
  }

  function resetValidateForm() {
    var inputs = Array.from(document.querySelectorAll('input'));
    inputs.forEach(function (input) {
      input.style.cssText = '';
    });
  }

  // (Handler) Функция проверки валидности полей формы, по клику на кнопку submit
  function onSubmitButtonAdclick() {
    validateForm(titleAd, priceAd);
  }

  // (Handler) Функция проверки валидности поля стоимости
  function onPriceApartmentAdInput(evt) {
    validateForm(evt.currentTarget);
  }

  // (Handler) Функция проверки валидности поля заголовка
  function onTitleAdInput(evt) {
    validateForm(evt.currentTarget);
  }

  // (Handler) Функция отправки данных на сервер
  function onFormAdSubmit(evt) {
    window.backend.send(new FormData(formAd), function () {
      successSubmitCallback();
      window.message.showSuccess();
    }, window.message.showError);
    evt.preventDefault();
  }

  // (Handler) Функция дезактивации страницы после нажатия на кнопку сброса
  function onResetButtonClick() {
    resetFormCallback();
  }

  // Функция callback - которая получит функцию дезактивации страницы после успешной отправки сообщения.
  function setSuccessSubmitCallback(callback) {
    successSubmitCallback = callback;
  }

  // Функция callback - которая получит функцию дезактивации страницы после нажатия на кнопку сброса
  function setButtonResetCallback(callback) {
    resetFormCallback = callback;

  }

  // Экспорт
  window.formAd = {
    toggle: toggleForm,
    writeАddress: writeАddressFormAd,
    reset: resetFormAd,
    setPriceParameters: setPriceParameters,
    setSuccessSubmitCallback: setSuccessSubmitCallback,
    setButtonResetCallback: setButtonResetCallback,
    addHandlers: addHandlers,
    removeHandlers: removeHandlers,
    activatePreview: activatePreview,
    deactivatePreview: deactivatePreview,
    resetValidate: resetValidateForm
  };

})();
