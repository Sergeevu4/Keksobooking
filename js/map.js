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
  var formAds = document.querySelector('.ad-form');


  // Функция добавления пинов в разметку через фрагмент
  function addPins(array) {
    var fragmentPin = document.createDocumentFragment();

    // Проверка у переданного с сервера массива, есть ли у его объектов ключа .offer
    var newArray = array.filter(function (elem) {
      return elem.offer;
    });

    for (var i = 0; i < newArray.length; i++) {
      fragmentPin.appendChild(window.pin.сreate(newArray[i]));
    }

    pinsContainerMap.appendChild(fragmentPin);

    // Обработчик события
    pinsContainerMap.addEventListener('click', onPinClick);
  }


  // Функция добавления карточки в разметку
  function addCard(object) {
    map.insertBefore(object, mapFilters);
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

  // Объект с координатами
  // Импорт window.form

  // // (Handler) Функция внесения координат в адрес input
  // function writeАddressFormAds(object) {
  //   addressFormAds.value = (object.x + ',' + object.y);
  // }

  // Массив с объектами
  var dataArray = [];
  // Функция для получения массива с сервера и передача его в onPinClick
  function setDataArray(array) {
    dataArray = array;
    // console.log(dataArray);
  }

  // (Handler) Функция обработчик: по нажатию на пин => отрисовка карточки в HTML
  function onPinClick(evt) {
    var pinsClick = evt.target.closest('.map__pin:not(.map__pin--main)');
    // pinsClick.classList.add('map__pin--active');

    if (pinsClick) {
      // Импорт с data -  window.data
      var currentInfo = dataArray.filter(function (item) {
        return item.id === pinsClick.id;
      })[0];

      // Удаления перед отрисовкой карточки + удаление класса activePin;
      closeCard();

      // Отрисовка
      // Импорт window.card
      addCard(window.card.create(currentInfo));

      // Добавление активного класса выбранному пину
      pinsClick.classList.add('map__pin--active');

      // Закрытие карточки по кнопке
      var closeCardButton = document.querySelector('.popup__close');
      closeCardButton.addEventListener('click', closeCard);
    }

  }

  // Удаления активного пина при выборе следующей карточки
  function closeCard() {
    var card = document.querySelector('.map__card');
    var activePin = document.querySelector('.map__pin--active');
    if (card) {
      map.removeChild(document.querySelector('.map__card'));
      activePin.classList.remove('map__pin--active');
    }
  }


  // (Handler) Функция обработчика нажатия по Escape
  function onEscPress(evt) {
    if (evt.code === 'Escape') {
      closeCard();
    }
  }

  // Обработчик события клика и последующего закрытия карточки
  document.addEventListener('keydown', onEscPress);


  // Объект с записанными первоначальными координатами для последующего возврата Главного пина
  var MAIN_PIN_INITIAL_POSITION = {
    // left: 570,
    // top: 375
    left: pinMain.style.left,
    top: pinMain.style.top
  };

  // Функция удаления Пинов при дезактивации страницы и при нажатии на кнопку сбороса
  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      pinsContainerMap.removeChild(document.querySelector('.map__pin:not(.map__pin--main)'));
      // pins.remove();
    }
  }

  // Функция переключения классов при активации и дезактивации страницы
  function toggleSiteState() {
    map.classList.toggle('map--faded');
    formAds.classList.toggle('ad-form--disabled');
  }

  // Возврат Главного пина в точку его первоначального состояния
  function resetMainPinPosition() {
    pinMain.style.left = MAIN_PIN_INITIAL_POSITION.left;
    pinMain.style.top = MAIN_PIN_INITIAL_POSITION.top;
  }

  // Экспорт
  window.map = {
    addPins: addPins,
    getCoordinates: getCoordinates,
    // onPinClick: onPinClick,
    setDataArray: setDataArray,
    closeCard: closeCard,
    removePins: removePins,
    toggleSiteState: toggleSiteState,
    resetMainPinPosition: resetMainPinPosition
  };

})();
