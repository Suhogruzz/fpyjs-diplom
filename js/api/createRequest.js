/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (url, options={}, callback) => {
    fetch(url, options).then(response => {
        if (response.ok) {
            response.text().then(text => text? callback(JSON.parse(text)): callback({}));
        } else {
            alert('Ошибка в HTTP:' + response.status + '\n' + response.statusText);
            callback(false);
        }
    });
};