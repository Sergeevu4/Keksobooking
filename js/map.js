'use strict';
(function () {

  // Форма объявлений +
  var formAds = document.querySelector('.ad-form');

  // Адрес в форме объявлений +
  var addressFormAds = formAds.querySelector('#address');
  // addressFormAds.readOnly = true;

  // Путь к главному пространству - карта(section) ++
  var map = document.querySelector('.map');

  // Высота острия главного пина +
  var PIN_MAIN_HEIGHT = 19;

  // Главный Pin +
  var pinMain = document.querySelector('.map__pin--main');


  // Функция подсчета координат для Основного пина
  function getCoordinates() {
    var coordinates = {
      x: parseInt(pinMain.style.left, 10) + pinMain.offsetWidth / 2,
      y: parseInt(pinMain.style.top, 10) + pinMain.offsetHeight / 2
    };

    if (!map.classList.contains('map--faded')) {
      coordinates.y = parseInt(pinMain.style.top, 10) + pinMain.offsetHeight + PIN_MAIN_HEIGHT;
    }

    return coordinates;
  }

  // Объект с координатами
  writeАddressFormAds(getCoordinates());

  // (Handler) Функция внесения координат в адрес input
  function writeАddressFormAds(object) {
    addressFormAds.value = (object.x + ',' + object.y);
  }

  // (Handler) Функция обработчик: по нажатию на пин => отрисовка карточки в HTML
  function onPinClick(evt) {
    var pinsClick = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (evt.target.classList.contains('.map__pin:not(.map__pin--main)')) {
      return;
    }

    if (pinsClick) {
      // Импорт с data -  window.data
      var currentInfo = window.data.generatedObjects.filter(function (item) {
        return item.id === pinsClick.id;
      });

      // Закрытие перед отрисовкой
      closeCard();

      // Отрисовка
      // Импорт window.card
      window.card.addCard(window.card.createCard(currentInfo[0]));

      // Закрытие карточки по кнопке
      var closeCardButton = document.querySelector('.popup__close');
      closeCardButton.addEventListener('click', closeCard);
    }
  }

  // Функция закрытия карточек + Проверка существует ли она вообще, перед закрытием
  function closeCard() {
    var card = document.querySelector('.map__card');
    if (card) {
      map.removeChild(document.querySelector('.map__card'));
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

  // Экспорт
  window.map = {
    getCoordinates: getCoordinates,
    writeАddressFormAds: writeАddressFormAds,
    onPinClick: onPinClick
  };

})();
