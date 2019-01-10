'use strict';

(function () {
  // Количество отфильтрованных объявлений
  var FILTERED_ADS_NUMBER = 5;

  // Диапазон стоимости
  var Price = {
    LOW: 10000,
    HIGH: 50000,
  };

  // Перечисление состояний в форме
  var FilterValue = {
    ANY: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  // Форма фильтрации объявлений
  var formFilters = document.querySelector('.map__filters');

  // Тип апартаментов
  var typeApartment = formFilters.querySelector('#housing-type');

  // Цена
  var priceApartment = formFilters.querySelector('#housing-price');

  // Количество комнат
  var roomsApartment = formFilters.querySelector('#housing-rooms');

  // Количество гостей
  var guestsApartment = formFilters.querySelector('#housing-guests');

  // Пересохраненный массив данных с сервера
  var dataAds = [];

  // callback переменная
  var updatePinsCallback = null;

  // Функция добавления обработчика на форму фильтрации после активации страницы
  function addHandler() {
    formFilters.addEventListener('change', onFilterChange);
  }

  // Функция удаления обработчика на форму фильтрации после дезактивации страницы
  function removeHandler() {
    formFilters.removeEventListener('change', onFilterChange);
  }

  // (Handler) функция обработчик: которая принимает вызывает функцию с отфильтрованным массивом данных которая, этот массив данных отрисовывает полученный массив на странице
  function onFilterChange() {

    // Функция таймер debounce
    window.debounce(function () {
      updatePinsCallback(dataAds);
    });
  }

  // Функция фильтрации по количеству комнат
  function isTypeMatch(ad) {
    return ad.offer.type === typeApartment.value || typeApartment.value === FilterValue.ANY;
  }

  // Функция фильтрации по количеству комнат
  function isRoomsMatch(ad) {
    return ad.offer.rooms === parseInt(roomsApartment.value, 10) || roomsApartment.value === FilterValue.ANY;
  }

  // Функция количество гостей
  function isGuestsMatch(ad) {
    return ad.offer.guests === parseInt(guestsApartment.value, 10) || guestsApartment.value === FilterValue.ANY;
  }

  // Функция фильтрации по стоимости
  function isPriceMatch(ad) {
    switch (priceApartment.value) {
      case FilterValue.LOW:
        return ad.offer.price <= Price.LOW;

      case FilterValue.MIDDLE:
        return ad.offer.price >= Price.LOW && ad.offer.price <= Price.HIGH;

      case FilterValue.HIGH:
        return ad.offer.price >= Price.HIGH;

      case FilterValue.ANY:
      default:
        return true;
    }
  }

  // Функция фильтрации преимуществ: checkbox
  function isFeaturesMatch(ad) {
    var checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
    var isSuited = Array.from(checkedFeatures).every(function (feature) {
      return ad.offer.features.includes(feature.value);
    });
    return isSuited;
  }

  // Основная функция фильтрации
  function filterData(ads) {
    return ads.filter(function (ad) {
      return isTypeMatch(ad) && isRoomsMatch(ad) && isGuestsMatch(ad) && isPriceMatch(ad) && isFeaturesMatch(ad);
    }).slice(0, FILTERED_ADS_NUMBER);
  }

  // Функция получения и сохранения массива с сервера, для дальнейшей манипуляции(фильтрации) и отрисовкой пинов ~ карточек на странице
  function setDataAds(ads) {
    dataAds = ads;
  }

  // Функция callback - получает из main основную функцию отрисовки и фильтрации массива данных
  function setUpdatePinsCallback(callback) {
    updatePinsCallback = callback;
  }

  // Экспорт
  window.formFilters = {
    setDataAds: setDataAds,
    filter: filterData,
    setUpdatePinsCallback: setUpdatePinsCallback,
    addHandler: addHandler,
    removeHandler: removeHandler
  };

})();
