'use strict';

(function () {
  // Количество отфильтрованных объявлений
  var FILTERED_ADS_NUMBER = 5;

  // Диапазон стоимости
  var Price = {
    LOW: 10000,
    HIGH: 50000,
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

  // Преимущества
  var featuresApartment = document.querySelector('#housing-features');

  // Пересохраненный массив данных с сервера
  var dataAds = [];

  // callback переменная
  var updatePinsCallback = null;

  // Обработчики событий изменения формы фильтрации
  typeApartment.addEventListener('change', onFilterChange);
  priceApartment.addEventListener('change', onFilterChange);
  roomsApartment.addEventListener('change', onFilterChange);
  guestsApartment.addEventListener('change', onFilterChange);
  featuresApartment.addEventListener('change', onFilterChange);


  // (Handler) функция обработчик: которая принимает вызывает функцию с отфильтрованным массивом данных которая, этот массив данных отрисовывает полученный массив на странице
  function onFilterChange() {

    // Функция таймер debounce
    window.debounce(function () {
      updatePinsCallback(dataAds);
    });
  }

  // Функция фильтрации по количеству комнат
  function isTypeMatch(ad) {
    return ad.offer.type === typeApartment.value || typeApartment.value === 'any';
  }

  // Функция фильтрации по количеству комнат
  function isRoomsMatch(ad) {
    return ad.offer.rooms === parseInt(roomsApartment.value, 10) || roomsApartment.value === 'any';
  }

  // Функция количество гостей
  function isGuestsMatch(ad) {
    return ad.offer.guests === parseInt(guestsApartment.value, 10) || guestsApartment.value === 'any';
  }

  // Функция фильтрации по стоимости
  function isPriceMatch(ad) {
    var priceMath;
    switch (priceApartment.value) {
      case 'middle':
        priceMath = ad.offer.price >= Price.LOW && ad.offer.price <= Price.HIGH;
        break;

      case 'low':
        priceMath = ad.offer.price <= Price.LOW;
        break;

      case 'high':
        priceMath = ad.offer.price >= Price.HIGH;
        break;

      case 'any':
      default:
        priceMath = true;
        break;
    }
    return priceMath;
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
    var filteredAds = ads.filter(function (ad) {
      return isTypeMatch(ad) && isRoomsMatch(ad) && isGuestsMatch(ad) && isPriceMatch(ad) && isFeaturesMatch(ad);
    });
    return (filteredAds.length > FILTERED_ADS_NUMBER) ? filteredAds.slice(0, FILTERED_ADS_NUMBER) : filteredAds;
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
    setUpdatePinsCallback: setUpdatePinsCallback
  };

})();
