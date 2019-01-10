'use strict';

(function () {

  // Адрес для отправки форму на сервер
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  // Адрес для загрузки данных с сервера
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  // Номер успешной загрузки, отправки на сервер
  var SUCCESS_CODE = 200;

  // Время ожидания от сервера миллисекундах
  var LIMIT_TIMEOUT = 10000;

  // Функция создания запроса к серверу
  function createRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = LIMIT_TIMEOUT; // 10s

    return xhr;
  }

  // Функция отправки запроса с данными формы на сервер
  function sendBackend(data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('POST', SEND_URL);
    // data - отправка данных формы на сервер
    xhr.send(data);
  }

  // Функция получения(загрузки) данных (массива с объектами) с сервера
  function loadBackend(onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('GET', LOAD_URL);
    xhr.send();
  }

  // Экспорт
  window.backend = {
    send: sendBackend,
    load: loadBackend
  };

})();
