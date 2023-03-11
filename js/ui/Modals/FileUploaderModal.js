/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super( element );
    this.uploaderElements = document.querySelector('.file-uploader-modal');
    this.content = this.uploaderElements.querySelector('.content');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    this.uploaderElements.onclick = (e) => {

      if (e.target.classList.contains('x')) {
        this.close();
      }
      if (e.target.classList.contains('close')) {
        this.close();
      }
      if (e.target.classList.contains('send-all')) {
        this.sendAllImages();
      }
    }
    
    this.content.onclick = (e) => {

      if (e.target.tagName == 'input') {
        e.target.closest('input').classList.remove('error');
      }
      if (e.target.classList.contains('button')) {
        this.sendImage(e.target.closest('.image-preview-container'));
      }
    }
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    let imagesReversed = images.reverse();
    let imagesModal = [];

    imagesReversed.forEach(image => imagesModal.push(this.getImageHTML(image)));
    this.content.innerHTML = imagesModal.join('');
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    let validHTML = `
      <div class="image-preview-container">
        <img src=${item.querySelector('img').getAttribute('src')} />
        <div class="ui action input">
            <input type="text" placeholder="Путь к файлу">
          <button class="ui button"><i class="upload icon"></i></button>
        </div>
      </div>
    `;

    return validHTML;
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    [...this.content.querySelectorAll('.image-preview-container')].forEach(image => {
      this.sendImage(image);
    });
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    let url = imageContainer.querySelector('img').getAttribute('src');
    let path = imageContainer.querySelector('input').value.trim();
    if (path == '') {
      imageContainer.querySelector('.input').classList.add('error');
      return;
    };
    imageContainer.querySelector('.input').classList.add('disabled');
    Yandex.uploadFile(path, url, (err) => {
      if (err === false) {
        imageContainer.querySelector('.input').classList.remove('disabled');
        imageContainer.querySelector('input').value = '';
      } else {
        console.log('Error')
        imageContainer.remove();
        if ([...this.content.querySelectorAll('.image-preview-container')].length < 1) {
          this.close();
        }
      }
    });
  }
}