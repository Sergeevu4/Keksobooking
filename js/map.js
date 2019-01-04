'use strict';

(function () {
  // Высота острия главного пина +
  var PIN_MAIN_HEIGHT_POINTER = 19;

  // Путь к главному пространству - карта(section) ++
  var map = document.querySelector('.map');

  // Контейнер формы фильтрации
  var mapFilters = document.querySelector('.map__filters-container');

  // Главный Pin +
  var pinMain = document.querySelector('.map__pin--main');

  // Контейнер Div Пинов на карте
  var pinsContainerMap = document.querySelector('.map__pins');

  // Форма объявлений
  var formAd = document.querySelector('.ad-form');

  // Форма фильтрации объявлений
  var formFilters = document.querySelector('.map__filters');

  // Объект с записанными первоначальными координатами для последующего возврата Главного пина
  var mainPinInitialPosition = {
    left: pinMain.style.left,
    top: pinMain.style.top
  };

  // Массив с объектами с сервера
  var dataAds = [];

  // Обработчик события клика и последующего закрытия карточки
  document.addEventListener('keydown', onEscPress);

  // Функция для получения массива с сервера и передача его в onPinClick
  function setSaveAds(ads) {
    dataAds = ads;
  }

  // Функция добавления пинов в разметку через фрагмент
  function addPins(ads) {
    var fragmentPin = document.createDocumentFragment();

    ads.filter(function (ad) {
      return ad.offer;
    }).forEach(function (ad) {
      fragmentPin.appendChild(window.pin.сreate(ad));
    });

    pinsContainerMap.appendChild(fragmentPin);

    // Обработчик события
    pinsContainerMap.addEventListener('click', onPinClick);
  }

  // Функция добавления карточки в разметку
  function addCard(ad) {
    map.insertBefore(ad, mapFilters);
  }

  // Удаления активного пина при выборе следующей карточки
  function closeCard() {
    var card = document.querySelector('.map__card');
    var activePin = document.querySelector('.map__pin--active');
    if (card) {
      card.remove();
      activePin.classList.remove('map__pin--active');
    }
  }

  // (Handler) Функция обработчик: по нажатию на пин => отрисовка карточки в HTML
  function onPinClick(evt) {
    var pinsClick = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (pinsClick) {
      var currentAd = dataAds.filter(function (item) {
        return item.id === pinsClick.id;
      })[0];

      // Удаления перед отрисовкой карточки + удаление класса activePin;
      closeCard();

      // Отрисовка
      addCard(window.card.create(currentAd));

      // Добавление активного класса выбранному пину
      pinsClick.classList.add('map__pin--active');

      // Закрытие карточки по кнопке
      var closeCardButton = document.querySelector('.popup__close');
      closeCardButton.addEventListener('click', closeCard);
    }
  }

  // (Handler) Функция обработчика нажатия по Escape
  function onEscPress(evt) {
    if (evt.code === 'Escape') {
      closeCard();
    }
  }

  // Функция удаления Пинов при дезактивации страницы и при нажатии на кнопку сбороса
  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    Array.from(pins).forEach(function (pin) {
      pin.remove();
    });
  }

  // Возврат Главного пина в точку его первоначального состояния
  function resetMainPinPosition() {
    pinMain.style.left = mainPinInitialPosition.left;
    pinMain.style.top = mainPinInitialPosition.top;
  }

  // Функция подсчета координат для Основного пина
  function getCoordinates() {
    var coordinates = {
      x: parseInt(pinMain.style.left, 10) + Math.round(pinMain.offsetWidth / 2),
      y: parseInt(pinMain.style.top, 10) + Math.round(pinMain.offsetHeight / 2)
    };

    if (!map.classList.contains('map--faded')) {
      coordinates.y = parseInt(pinMain.style.top, 10) + pinMain.offsetHeight + PIN_MAIN_HEIGHT_POINTER;
    }

    return coordinates;
  }

  // Функция переключения классов при активации и переключения доступности к формам
  function toggleSiteState() {
    map.classList.toggle('map--faded');
    formAd.classList.toggle('ad-form--disabled');
    window.formAd.toggle(formAd);
    window.formAd.toggle(formFilters);
  }

  // Экспорт
  window.map = {
    addPins: addPins,
    getCoordinates: getCoordinates,
    setSaveAds: setSaveAds,
    closeCard: closeCard,
    removePins: removePins,
    toggleSiteState: toggleSiteState,
    resetMainPinPosition: resetMainPinPosition
  };

})();
