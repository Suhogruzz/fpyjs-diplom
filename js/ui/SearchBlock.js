/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    let searchBlock = document.querySelector('.search-block');
    searchBlock.onclick = (e) => {
      let input = document.querySelector('input');
      if (e.target == document.querySelector('.add') || e.target == document.querySelector('.replace')) {
        if (input.value.trim() != '') {
          if (e.target == document.querySelector('.replace')) {
            App.imageViewer.clear();
          } else {
            try {
              VK.get(input.value, App.imageViewer.drawImages);
            }
            catch (e) {
              alert(`Ошибка ${e.name}: ${e.message}`);
            }
          }
        }
      }
    }
  }
}