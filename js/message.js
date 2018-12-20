'use strict';
(function () {
  // Main на странице сайта
  var siteMain = document.querySelector('main');

  // Ошибка при загрузке или отправки данных на сервере
  function showMessageError(errorMessage) {
    // Путь к шаблону сообщения на странице
    var messageErrorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

    var clonedMessageError = messageErrorTemplate.cloneNode(true);
    clonedMessageError.querySelector('.error__message').textContent = errorMessage;

    // return clonedMessageError;
    siteMain.appendChild(clonedMessageError);

    document.addEventListener('click', onCloseMessageError);
    document.addEventListener('keydown', onMessageErrorEscPresskeyDown);
  }

  // Сообщение об успешной отправке формы на сервер
  function showMessageSuccess() {
    // Путь к шаблону сообщения на странице
    var messageSuccessTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

    var clonedMessageSuccess = messageSuccessTemplate.cloneNode(true);

    siteMain.appendChild(clonedMessageSuccess);

    document.addEventListener('click', onCloseMessageSuccess);
    document.addEventListener('keydown', onMessageSuccessEscPresskeyDown);

  }

  function onCloseMessageError() {
    // Окно сообщения об ошибки
    var windowError = document.querySelector('.error');
    if (windowError) {
      siteMain.removeChild(document.querySelector('.error'));
      document.removeEventListener('click', onCloseMessageError);
      document.removeEventListener('keydown', onMessageErrorEscPresskeyDown);
    }
  }

  function onCloseMessageSuccess() {
    // Окно сообщения об успешной отправки
    var windowSuccess = document.querySelector('.success');
    if (windowSuccess) {
      siteMain.removeChild(document.querySelector('.success'));
      document.removeEventListener('click', onCloseMessageSuccess);
      document.removeEventListener('keydown', onMessageSuccessEscPresskeyDown);
    }
  }


  // Функция закрытия окна сообщения об ошибки по ESC
  function onMessageErrorEscPresskeyDown(evt) {
    if (evt.code === 'Escape') {
      onCloseMessageError();
    }
  }

  function onMessageSuccessEscPresskeyDown(evt) {
    if (evt.code === 'Escape') {
      onCloseMessageSuccess();
    }
  }




  // Функция закрытия окна сообщения об ошибки сервера
  // function closeMessageError() {
  //   // Окно сообщения об ошибки
  //   var windowError = document.querySelector('.error');
  //   if (windowError) {
  //     siteMain.removeChild(document.querySelector('.error'));
  //   }
  // }


  // var windowError = null;
  // var windowSuccess = null;


  // function closeMessage(windowMessage) {
  //   // Окно сообщения об ошибки
  //   // var windowError = document.querySelector('.error');
  //   windowError = document.querySelector('.error');
  //   windowSuccess = document.querySelector('.success');
  //   switch (windowMessage) {
  //     case windowError:
  //       windowError.remove();
  //       document.removeEventListener('click', onCloseMessageErrorClick);
  //       document.removeEventListener('keydown', onMessageErrorEscPresskeyDown);
  //       break;
  //     case windowSuccess:
  //       windowSuccess.remove();
  //       document.removeEventListener('click', onCloseMessageSuccessClick);
  //       document.removeEventListener('keydown', onMessageSuccessEscPresskeyDown);
  //       break;

  //   }
  // }

  // // Функция закрытия окна сообщения об ошибки по ESC
  // function onMessageErrorEscPresskeyDown(evt) {
  //   if (evt.code === 'Escape') {
  //     closeMessage(windowError);
  //   }
  // }

  // function onMessageSuccessEscPresskeyDown(evt) {
  //   if (evt.code === 'Escape') {
  //     closeMessage(windowSuccess);
  //   }
  // }


  // function onCloseMessageErrorClick() {
  //   closeMessage(windowError);
  // }

  // function onCloseMessageSuccessClick() {
  //   closeMessage(windowSuccess);


  // Обработчики событий по клику и по нажатию ESС для закрытия окна ошибки

  // Экспорт
  window.message = {
    showMessageError: showMessageError,
    showMessageSuccess: showMessageSuccess
  };
})();
