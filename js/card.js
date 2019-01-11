'use strict';

(function () {

  // Размеры фотографий в карточках
  var CARDS_PHOTO_WIDTH = '45';
  var CARDS_PHOTO_HEIGHT = '40';

  var GuestEnding = {
    DEFAULT: ' гостей',
    ONE: ' гостя'
  };

  var Pluralize = {
    ONE: 1,
    TWO: 2,
    FOUR: 4,
    TWENTY: 20,
    MULTIPLE_OF_TEN: 10
  };

  // Типы апартаментов
  var TypeApartment = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  // Путь к шаблону карточки
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  // Список преимуществ
  var cardFeaturesList;
  // Фотографии
  var cardPhotosList;

  // Функция создания карточки
  function createCard(ad) {
    // Клонирование карточки со всеми элементами из template
    var clonedCard = cardTemplate.cloneNode(true);
    // Заголовок
    var cardTitle = clonedCard.querySelector('.popup__title');
    // Адрес
    var cardAddress = clonedCard.querySelector('.popup__text--address');
    // Стоимость проживания
    var cardPrice = clonedCard.querySelector('.popup__text--price');
    // Лист преимуществ (особенностей) в карточке объявления
    cardFeaturesList = clonedCard.querySelector('.popup__features');
    // Тип апартаментов (жилья)
    var cardTypeApartment = clonedCard.querySelector('.popup__type');
    // Количество комнат ~ количество гостей
    var cardCapacity = clonedCard.querySelector('.popup__text--capacity');
    // Время заселения и выселения
    var cardTimeResidence = clonedCard.querySelector('.popup__text--time');
    // Описание
    var cardDescription = clonedCard.querySelector('.popup__description');
    // Фотографии
    cardPhotosList = clonedCard.querySelector('.popup__photos');
    // Аватар размещающего объявление
    var cardAvatar = clonedCard.querySelector('.popup__avatar');

    // Обязательные поля формы объявления
    cardAvatar.src = ad.author.avatar;
    cardTitle.textContent = ad.offer.title;
    cardAddress.textContent = ad.offer.address;
    cardPrice.textContent = ad.offer.price + '₽/ночь';
    cardTypeApartment.textContent = TypeApartment[ad.offer.type];

    if (ad.offer.rooms && ad.offer.guests) {
      cardCapacity.textContent = ad.offer.rooms + getRooms(ad.offer.rooms) + ad.offer.guests + ((ad.offer.guests === Pluralize.ONE) ? GuestEnding.ONE : GuestEnding.DEFAULT) + '.';

    } else {
      cardCapacity.classList.add('hidden');
    }

    if (ad.offer.checkin && ad.offer.checkout) {
      cardTimeResidence.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout + '.';
    } else {
      cardTimeResidence.classList.add('hidden');
    }

    if (ad.offer.description) {
      cardDescription.textContent = ad.offer.description;
    } else {
      cardDescription.classList.add('hidden');
    }

    // Стирания первоначальных элементов списоков у фрагмента
    cardFeaturesList.innerHTML = '';
    cardPhotosList.innerHTML = '';

    if (ad.offer.features.length) {
      // Вызов функции по созданию списка преимуществ через фрагмент в карточку
      addFeatures(ad.offer.features);
    } else {
      cardFeaturesList.classList.add('hidden');
    }

    if (ad.offer.photos.length) {
      // Вызов функции по созданию фотографий и их отрисовку через фрагмент в карточку
      addPhotos(ad.offer.photos);
    } else {
      cardPhotosList.classList.add('hidden');
    }

    return clonedCard;
  }

  // Добавления списка преимуществ через фрагмент в карточку
  function addFeatures(features) {
    var fragmentFeature = document.createDocumentFragment();
    features.forEach(function (feature) {
      fragmentFeature.appendChild(createFeature(feature));
    });

    cardFeaturesList.appendChild(fragmentFeature);
  }

  // Добавления создание элемента списка преимуществ
  function createFeature(feature) {
    var cardFeature = document.createElement('li');
    cardFeature.classList.add('popup__feature', 'popup__feature--' + feature);
    return cardFeature;
  }

  // Функция добавляет полученные фотографии в карточку, разметку через фрагмент
  function addPhotos(photos) {
    var fragmentCardPhoto = document.createDocumentFragment();
    photos.forEach(function (photo) {
      fragmentCardPhoto.appendChild(createPhoto(photo));
    });
    cardPhotosList.appendChild(fragmentCardPhoto);
  }

  // Функция проверки количества комнат в полученном с сервера объявлений и подстановка правильного окончания
  function getRooms(roomsNumber) {
    var roomText = '';
    if ((roomsNumber === Pluralize.ONE) || (roomsNumber > Pluralize.TWENTY && roomsNumber % Pluralize.MULTIPLE_OF_TEN === Pluralize.ONE)) {
      roomText = ' комната для ';
    } else if ((roomsNumber >= Pluralize.TWO && roomsNumber <= Pluralize.FOUR) || (roomsNumber > Pluralize.TWENTY && roomsNumber % Pluralize.MULTIPLE_OF_TEN >= Pluralize.TWO && roomsNumber % Pluralize.MULTIPLE_OF_TEN <= Pluralize.FOUR)) {
      roomText = ' комнаты для ';
    } else {
      roomText = ' комнат для ';
    }
    return roomText;
  }

  // Функция создает фотографию
  function createPhoto(photoSrc) {
    var cardPhoto = document.createElement('img');
    cardPhoto.classList.add('popup__photo');
    cardPhoto.src = photoSrc;
    cardPhoto.alt = 'Фотография жилья';
    cardPhoto.width = CARDS_PHOTO_WIDTH;
    cardPhoto.height = CARDS_PHOTO_HEIGHT;

    return cardPhoto;
  }

  // Экспорт
  window.card = {
    create: createCard
  };
})();
