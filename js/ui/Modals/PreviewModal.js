/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
    super( element );
    this.previewerElements = document.querySelector('.uploaded-previewer-modal');
    this.content = this.previewerElements.querySelector('.content');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    this.previewerElements.onclick = (e) => {

      if (e.target.classList.contains('x')) {
        this.close();
      }
    }

    this.content.onclick = (e) => {

      if (e.target.classList.contains('delete')) {
        e.target.querySelector('i').classList.add('icon', 'spinner', 'loading');
        e.target.classList.add('disabled');

        let path = e.target.dataset.path;
        Yandex.removeFile(path, (response) => {
          if (response.status <= 204) {
            e.target.closest('.image-preview-container').remove();
          }
        })
      }
      if (e.target.classList.contains('download')) {
        Yandex.downloadFileByUrl(e.target.dataset.file);
      }
    }
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    let dataReversed = data['items'].reverse().filter(e => e['media_type'] == 'image');
    let images = [];

    dataReversed.forEach(e => images.push(this.getImageInfo(e)));
    this.content.innerHTML = images.join('');
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    let months = ['января','ферваля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря',];
    let dt = new Date(Date.parse(date));
  
    return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()} г. в ${dt.getHours()} ${dt.getMinutes()}`;
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    let size = Math.round(item.size/1024);
    let html = `
    <div class="image-preview-container">
    <img src=${item.file}>
    <table class="ui celled table">
    <thead>
      <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
    </thead>
    <tbody>
      <tr><td>${item.name}</td><td>${this.formatDate(item.created)}</td><td>${size}Кб</td></tr>
    </tbody>
    </table>
    <div class="buttons-wrapper">
      <button class="ui labeled icon red basic button delete" data-path="${item.path}">
        Удалить
        <i class="trash icon"></i>
      </button>
      <button class="ui labeled icon violet basic button download" data-file="${item.file}">
        Скачать
        <i class="download icon"></i>
      </button>
    </div>
  </div>
  `;

  return html;
  }
}
