'use strict';

(function () {

  // Размеры фотографий в карточках
  var CARDS_PHOTO_WIDTH = '45';
  var CARDS_PHOTO_HEIGHT = '40';

  // Путь к шаблону карточки
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  // Функция создания карточки
  function createCard(object) {
    var clonedCard = cardTemplate.cloneNode(true);

    clonedCard.querySelector('.popup__title').textContent = object.offer.title;
    clonedCard.querySelector('.popup__text--address').textContent = object.offer.address;
    clonedCard.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';

    // Импорт с data -  window.data.typeArray
    clonedCard.querySelector('.popup__type').textContent = window.data.typeArray[object.offer.type];

    clonedCard.querySelector('.popup__text--capacity').textContent = object.offer.rooms + ' комнаты для ' + object.offer.rooms + ' гостей.';

    clonedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '.';

    var popupFeaturesList = clonedCard.querySelector('.popup__features');
    popupFeaturesList.innerHTML = '';

    // Цикл по созданию элементов списка (features) в карточках
    if (object.offer.features.length) {
      for (var i = 0; i < object.offer.features.length; i++) {
        var featuresListItem = document.createElement('li');
        featuresListItem.classList.add('popup__feature', 'popup__feature--' + object.offer.features[i]);
        popupFeaturesList.appendChild(featuresListItem);
      }
    } else {
      popupFeaturesList.classList.add('hidden');
    }

    clonedCard.querySelector('.popup__description').textContent = object.offer.description;

    var popupFeaturesPhotos = clonedCard.querySelector('.popup__photos');
    popupFeaturesPhotos.innerHTML = '';

    // Цикл по созданию фотографий в карточках
    for (var j = 0; j < object.offer.photos.length; j++) {
      var cardPhoto = document.createElement('img');
      cardPhoto.classList.add('popup__photo');
      cardPhoto.src = object.offer.photos[j];
      cardPhoto.alt = 'Фотография жилья';
      cardPhoto.width = CARDS_PHOTO_WIDTH;
      cardPhoto.height = CARDS_PHOTO_HEIGHT;
      popupFeaturesPhotos.appendChild(cardPhoto);
    }

    clonedCard.querySelector('img').src = object.author.avatar;

    return clonedCard;
  }

  // Экспорт
  window.card = {
    create: createCard
  };
})();
