'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // Объект содержащий в себе input + обработчики
  var previewInput = {};
  // Массив для поселяющего удаления обработчиков
  var previewInputs = [];

  // Основная функция по превью изображений в зависимости от того с какого input была загрузка, и была ли она вообще.
  function preview(fileChooser, filePreview) {
    // fileChooser - input type = 'file'
    // filePreview - Img - если он есть в разметке (аватар), или это div (контейнер) внутри которого будут отрисовывается img (несколько загружаемых картинок)
    function onFileChooserChange() {
      // files - это файл, файлы загружаемые через input
      var files = fileChooser.files;

      // Проверка на существования атрибута multiple у input + были ли они загружены
      if (fileChooser.multiple && files.length) {
        showMultiplePreview(files, filePreview);
      } else if (!fileChooser.multiple && files.length) {
        showSinglePreview(files[0], filePreview);
      }
    }

    // Объект содержащий в себе input, методы добавления и удаления обработчиков
    previewInput = {
      input: fileChooser,
      activate: function () {
        this.input.addEventListener('change', onFileChooserChange);
      },
      deactivate: function () {
        this.input.removeEventListener('change', onFileChooserChange);
      }
    };

    // Добавления в массив объектов c методами и с названием того места (input) на котором будет находится обработчик.
    previewInputs.push(previewInput);

    // Добавления обработчика событий на fileChooser
    previewInput.activate();
  }

  // Функция по удалению обработчиков с input
  function removePreview(fileChooser) {
    previewInputs.forEach(function (item) {
      if (item.input === fileChooser) {
        item.deactivate();
      }
    });
  }

  // Функция для превью одного файла
  function showSinglePreview(file, imagePreview) {
    // Получаем имя файла, и преобразовываем в нижний регистр
    var fileName = file.name.toLowerCase();

    // Смотрим конец строки имени полученного файла(разрешения), и проверяем на соответствие массива разрешенных форматов
    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    //  Проверка, подходит ли разрешение файла под ограничения
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        // запись пути полученного файла в (imagePreview) img ~ scr, после асинхронного события load
        imagePreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  // Функция для превью нескольких файлов
  function showMultiplePreview(files, containerPreview) {
    // Фрагмент в который будут помещаться div(img)
    var fragmentFiles = document.createDocumentFragment();

    // Родительский div, в который будет помещаться сам фрагмент
    var containerFiles = containerPreview.parentNode;

    // Превращения коллекции в массив и последующий цикл
    Array.from(files).forEach(function (file) {
      // Скрываю пустой, серый (div)
      containerPreview.classList.add('hidden');

      // Клонирую пустой серый блок, без картинки (div)
      var newСontainerPreview = containerPreview.cloneNode();

      // Создаю в нем картинку
      var newImg = document.createElement('img');

      // Добавляю класс для верного отображения стилей и размера картинок
      newImg.classList.add('ad-form__photo');

      // Удаляю класс сокрытия, у клонированного div
      newСontainerPreview.classList.remove('hidden');

      // Вызываю функцию добавления src изображению
      showSinglePreview(file, newImg);

      // Кладу созданное изображение после добавления ему в src внутрь клонированного div
      newСontainerPreview.appendChild(newImg);

      // Кладу полученный div c изображением внутрь фрагмента
      fragmentFiles.appendChild(newСontainerPreview);
    });

    // Помещаю собранный фрагмент (div c изображением) в родительский DOM - узел
    containerFiles.appendChild(fragmentFiles);
  }

  // Экспорт
  window.preview = {
    add: preview,
    remove: removePreview
  };

})();
