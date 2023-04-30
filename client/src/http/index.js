import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('token')
    return config
}

$authHost.interceptors.response.use(function (response) {
    // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
    // Здесь можете сделать что-нибудь с ответом
    return response;
  }, function (error) {
    /** Разлогиниваем фронт если мидлваре сервера не принял токен */
    if (error.response.status == 401){
        console.log('status 401')
        window.location.href="/logout"
    }
    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    return Promise.reject(error);
  });


$authHost.interceptors.request.use(authInterceptor)

export{
    $host,
    $authHost
}