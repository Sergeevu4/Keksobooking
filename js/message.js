'use strict';
(function () {
  // Main на странице сайта
  var siteMain = document.querySelector('main');

  // Путь к шаблону сообщения на странице
  var errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  // Путь к шаблону сообщения на странице
  var successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  // Ошибка при загрузке или отправки данных на сервере
  function showErrorMessage(errorMessage) {
    var clonedErrorMessage = errorMessageTemplate.cloneNode(true);
    var buttonErrorMessage = clonedErrorMessage.querySelector('.error__button');

    // Параграф соответствует типу сообщения об ошибки в backend
    clonedErrorMessage.querySelector('.error__message').textContent = errorMessage;

    // return clonedErrorMessage;
    siteMain.appendChild(clonedErrorMessage);

    document.addEventListener('click', onErrorMessageCloseClick);
    buttonErrorMessage.addEventListener('click', onbuttonErrorMessageCloseClick);
    document.addEventListener('keydown', onErrorMessageEscKeydown);
  }

  // Сообщение об успешной отправке формы на сервер
  function showSuccessMessage() {
    var clonedSuccessMessage = successMessageTemplate.cloneNode(true);

    siteMain.appendChild(clonedSuccessMessage);

    document.addEventListener('click', onSuccessMessageCloseClick);
    document.addEventListener('keydown', onSuccessMessageEscKeydown);
  }

  // Функция закрытия окна сообщений (при ошибки и успешной отправки)
  function closeMessage(classMessage) {
    var message = document.querySelector('.' + classMessage);
    if (message) {
      message.remove();
      switch (classMessage) {
        case 'error':
          document.removeEventListener('click', onErrorMessageCloseClick);
          document.removeEventListener('keydown', onErrorMessageEscKeydown);
          break;

        case 'success':
          document.removeEventListener('click', onSuccessMessageCloseClick);
          document.removeEventListener('keydown', onSuccessMessageEscKeydown);
          break;

        default:
          throw new Error('Неизвестный тип сообщения');
      }
    }
  }

  // (Handler) Функция закрытия окна сообщения об ошибки, по клику на любую область
  function onErrorMessageCloseClick() {
    closeMessage('error');
  }

  // (Handler) Функция закрытия окна сообщения успешной отправки формы, по клику на любую область
  function onSuccessMessageCloseClick() {
    closeMessage('success');
  }

  // Функция закрытия окна сообщения успешной отправки формы по ESC
  function onErrorMessageEscKeydown(evt) {
    if (evt.code === 'Escape') {
      closeMessage('error');
    }
  }

  // Функция закрытия окна сообщения об ошибки по ESC
  function onSuccessMessageEscKeydown(evt) {
    if (evt.code === 'Escape') {
      closeMessage('success');
    }
  }

  function onbuttonErrorMessageCloseClick() {
    closeMessage('error');
  }

  // Экспорт
  window.message = {
    showError: showErrorMessage,
    showSuccess: showSuccessMessage
  };
})();
