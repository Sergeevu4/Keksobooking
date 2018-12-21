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

  // Путь к шаблону карточки
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  // Список преимуществ
  var cardFeaturesList = null;
  // Фотографии
  var cardPhotos = null;

  // Функция создания карточки
  function createCard(ads) {
    // Клонирование карточки со всеми элементами из template
    var clonedCard = cardTemplate.cloneNode(true);
    // Заголовок
    var cardTitle = clonedCard.querySelector('.popup__title');
    // Адрес
    var cardAddress = clonedCard.querySelector('.popup__text--address');
    // Стоимость проживания
    var cardPrice = clonedCard.querySelector('.popup__text--price');
    // Лист преимуществ (особенностей) в карточке объявления --- ???
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
    cardPhotos = clonedCard.querySelector('.popup__photos');
    // Аватар размещающего объявление
    var cardAvatar = clonedCard.querySelector('.popup__avatar');

    // Обязательные поля формы объявления
    cardAvatar.src = ads.author.avatar;
    cardTitle.textContent = ads.offer.title;
    cardAddress.textContent = ads.offer.address;
    cardPrice.textContent = ads.offer.price + '₽/ночь';
    cardTypeApartment.textContent = TypeArray[ads.offer.type];

    if (ads.offer.rooms) {
      cardCapacity.textContent = ads.offer.rooms + ' комнаты для ' + ads.offer.rooms + ' гостей.';
    } else {
      cardTypeApartment.classList.add('hidden');
    }

    if (ads.offer.checkin && ads.offer.checkout) {
      cardTimeResidence.textContent = 'Заезд после ' + ads.offer.checkin + ', выезд до ' + ads.offer.checkout + '.';
    } else {
      cardTimeResidence.classList.add('hidden');
    }

    if (ads.offer.description) {
      cardDescription.textContent = ads.offer.description;
    } else {
      cardDescription.classList.add('hidden');
    }

    // Стирания первоначальных элементов списоков у фрагмента
    cardFeaturesList.innerHTML = '';
    cardPhotos.innerHTML = '';


    if (ads.offer.features.length) {
      // Вызов функции по созданию списка преимуществ через фрагмент в карточку
      addFeatures(ads.offer.features);
    } else {
      cardFeaturesList.classList.add('hidden');
    }

    if (ads.offer.photos.length) {
      // Вызов функции по созданию фотографий и их отрисовку через фрагмент в карточку
      addPhotos(ads.offer.photos);
    } else {
      cardPhotos.classList.add('hidden');
    }

    return clonedCard;
  }

  // Добавления списка преимуществ через фрагмент в карточку
  function addFeatures(features) {
    var fragmentFeatures = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      fragmentFeatures.appendChild(createFeature(features[i]));
    }
    cardFeaturesList.appendChild(fragmentFeatures);
  }

  // Добавления создание элемента списка преимуществ
  function createFeature(feature) {
    var cardFeature = document.createElement('li');
    cardFeature.classList.add('popup__feature', 'popup__feature--' + feature);
    return cardFeature;
  }

  // Функция добавляет полученные фотографии в карточку, разметку через фрагмент
  function addPhotos(photos) {
    var fragmentCardPhotos = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragmentCardPhotos.appendChild(createPhoto(photos[i]));
    }
    cardPhotos.appendChild(fragmentCardPhotos);
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
