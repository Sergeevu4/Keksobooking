'use strict';

(function () {

  // Размеры фотографий в карточках
  var CARDS_PHOTO_WIDTH = '45';
  var CARDS_PHOTO_HEIGHT = '40';

  //  Перечисление объектов: типы апартаментов
  var TypeArray = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  // Функция создания карточки
  function createCard(object) {
    // Путь к шаблону карточки
    var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

    // Клонирование карточки со всеми элементами из template
    var clonedCard = cardTemplate.cloneNode(true);
    // Заголовок
    var cardTitle = clonedCard.querySelector('.popup__title');
    // Адрес
    var cardAddress = clonedCard.querySelector('.popup__text--address');
    // Стоимость проживания
    var cardPrice = clonedCard.querySelector('.popup__text--price');
    // Лист преимуществ (особенностей) в карточке объявления --- ???
    var cardFeaturesList = clonedCard.querySelector('.popup__features');
    // Тип апартаментов (жилья)
    var cardTypeApartment = clonedCard.querySelector('.popup__type');
    // Количество комнат ~ количество гостей
    var cardCapacity = clonedCard.querySelector('.popup__text--capacity');
    // Время заселения и выселения
    var cardTimeResidence = clonedCard.querySelector('.popup__text--time');
    // Описание
    var cardDescription = clonedCard.querySelector('.popup__description');
    // Фотографии
    var cardFeaturesPhotos = clonedCard.querySelector('.popup__photos');

    // Аватар размещающего объявление
    var cardAvatar = clonedCard.querySelector('.popup__avatar');
    cardAvatar.src = object.author.avatar;

    if (object.offer.title) {
      cardTitle.textContent = object.offer.title;
    } else {
      cardTitle.classList.add('hidden');
    }

    if (object.offer.address) {
      cardAddress.textContent = object.offer.address;
    } else {
      cardAddress.classList.add('hidden');
    }

    if (object.offer.price) {
      cardPrice.textContent = object.offer.price + '₽/ночь';
    } else {
      cardPrice.classList.add('hidden');
    }

    if (object.offer.type) {
      cardTypeApartment.textContent = TypeArray[object.offer.type];
    } else {
      cardTypeApartment.classList.add('hidden');
    }

    if (object.offer.rooms) {
      cardCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.rooms + ' гостей.';
    } else {
      cardTypeApartment.classList.add('hidden');
    }

    if (object.offer.checkin && object.offer.checkout) {
      cardTimeResidence.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '.';
    } else {
      cardTimeResidence.classList.add('hidden');
    }

    if (object.offer.description) {
      cardDescription.textContent = object.offer.description;
    } else {
      cardDescription.classList.add('hidden');
    }


    // Куда сунуть не знаю
    cardFeaturesList.innerHTML = '';
    cardFeaturesPhotos.innerHTML = '';

    // Цикл по созданию элементов списка (features) в карточках
    if (object.offer.features.length) {
      for (var i = 0; i < object.offer.features.length; i++) {
        var featuresListItem = document.createElement('li');
        featuresListItem.classList.add('popup__feature', 'popup__feature--' + object.offer.features[i]);
        cardFeaturesList.appendChild(featuresListItem);
      }
    } else {
      cardFeaturesList.classList.add('hidden');
    }


    // Цикл по созданию фотографий в карточках
    if (object.offer.photos.length) {
      for (var j = 0; j < object.offer.photos.length; j++) {
        var cardPhoto = document.createElement('img');
        cardPhoto.classList.add('popup__photo');
        cardPhoto.src = object.offer.photos[j];
        cardPhoto.alt = 'Фотография жилья';
        cardPhoto.width = CARDS_PHOTO_WIDTH;
        cardPhoto.height = CARDS_PHOTO_HEIGHT;
        cardFeaturesPhotos.appendChild(cardPhoto);
      }
    } else {
      cardFeaturesPhotos.classList.add('hidden');
    }

    return clonedCard;
  }

  // Экспорт
  window.card = {
    create: createCard
  };
})();
