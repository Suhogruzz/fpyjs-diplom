/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = '';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    const script = document.createElement('script');
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.processData`;
    document.getElementsByTagName("body")[0].appendChild(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    document.querySelector('body').lastElementChild.remove();
    if (result['error'] == undefined) {
      let imgList = result.response.items
      let urlList = [];
      imgList.forEach(element => {
          let bigsize = element['sizes'][element['sizes'].length - 1]['url'];
          if (bigsize) {
            urlList.push(bigsize);
            }
        });
        this.lastCallback(urlList);
    } else {
        alert('Ошибка :' + result['error']['error_code'] + '-' + result['error']['error_msg']);
    }
    this.lastCallback = () => {};
  };
}