/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.fluidImage = document.querySelector('.fluid');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    let container = document.querySelector('.container');

    container.ondblclick = e => {

      if (e.target.closest('.four')) {
        this.fluidImage.setAttribute('src', `${e.target.getAttribute('src')}`);
      }
    }

    container.onclick = e => {

      if (e.target.closest('.four')) {
        e.target.classList.toggle('selected');
        this.checkButtonText();
      }
      if (e.target.classList.contains('select-all')) {
        let allImages = [...document.querySelectorAll('.four')];
        let activeImages = allImages.filter(e => e.querySelector('img').classList.contains('selected'));
        if (activeImages.length == allImages.length) {
          allImages.forEach(e => e.querySelector('img').classList.remove('selected'));
        } else {
          allImages.forEach(e => e.querySelector('img').classList.add('selected'));
        };
        this.checkButtonText();
      }
      if (e.target.classList.contains('send')) {
        let fileUploader = App.getModal('fileUploader');
        let activeImages = [...document.querySelectorAll('.four')].filter(e => e.querySelector('img').classList.contains('selected'));
        fileUploader.open();
        fileUploader.showImages(activeImages);
        activeImages.forEach(e => e.querySelector('img').classList.remove('selected'));
      }
      if (e.target.classList.contains('show-uploaded-files')) {
        let filePreviewer = App.getModal('filePreviewer');
        filePreviewer.open();
        let bindImages = filePreviewer.showImages.bind(filePreviewer);
        Yandex.getUploadedFiles(bindImages);
      }
    }
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    [...document.querySelectorAll('.four')].forEach(e => e.remove());
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    let imagesWrapper = document.querySelector('.images-wrapper');

    if (images.length > 0) {
      document.querySelector('.select-all').classList.remove('disabled');
    } else {
      document.querySelector('.select-all').classList.add('disabled');
    }

    images.forEach(e => {
      imagesWrapper.querySelector('.row').innerHTML += `
      <div class='four wide column ui medium image-wrapper'><img src=${e} /></div>
      `
    });
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    let allImages = [...document.querySelectorAll('.four')];
    let activeImages = allImages.filter(e => e.querySelector('img').classList.contains('selected')); 
    let selectAll = document.querySelector('.select-all');
    let send = document.querySelector('.send');

    if (activeImages.length == allImages.length) {
      selectAll.textContent = 'Снять выделение';
    } else {
      selectAll.textContent = 'Выбрать все';
    }
    if (activeImages.length > 0) {
      send.classList.remove('disabled');
    } else {
      send.classList.add('disabled');
    }
  }
}