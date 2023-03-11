/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    let token = localStorage.getItem('token')? localStorage.getItem('token'): prompt('Введите токен Яндекс диска:');
    if (token) {
      localStorage.setItem('token', token);
    }
    return token;
  } 

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    try {
      createRequest({
        method: 'POST',
        url: `${this.HOST}/resources/upload`,
        data: {
          'path': path,
          'url': url,
        },
        headers: {'Authorization': `OAuth ${Yandex.getToken()}`},
        callback: callback,
      });
      console.log(path, url)
    }
    catch (e) {
      alert('Ошибка' + e.name + ':' + e.message);
    }
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){

    try {
      createRequest({
        method: 'DELETE',
        url: `${this.HOST}/resources`,
        data: {
          'path': path,
        },
        headers: {'Authorization': `OAuth ${Yandex.getToken()}`},
        callback: callback,
      });
    }
    catch (e) {
      alert('Ошибка' + e.name + ':' + e.message);
    }
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    try {
      createRequest({
        method: 'GET',
        url: `${this.HOST}/resources/files`,
        headers: {'Authorization': `OAuth ${Yandex.getToken()}`},
        callback: callback,
      });
    }
    catch (e) {
      alert('Ошибка' + e.name + ':' + e.message);
    }
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    let a = document.createElement('a');
    a.href = url;
    a.click();
  }
}
