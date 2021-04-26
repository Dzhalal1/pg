import Axios from "axios";
import Storage from "@/plugins/storage";

const http = Axios.create({
    // baseURL: 'https://mrs.kgsxa.ru/'
    baseURL: 'http://192.168.0.103:8000/'
})
if (localStorage.getItem('token')) {
    http.defaults.headers.common['Authorization'] = 'Token ' + Storage.getItem('token')
}
http.interceptors.response.use((response) => response, function (error) {
    let message = ''
    if (error.response) {
        if (error.response.status === 404) {
            message = 'Страница не найдена'
        } else {
            if (typeof (error.response.data) === "object") {
                for (const field in error.response.data) {
                    if (Array.isArray(error.response.data[field])) {
                        for (const mess of error.response.data[field]) {
                            message += `${field}: ${mess};`
                        }
                    } else {
                        message += `${error.response.data[field]}`
                    }
                }
            }
        }
    } else if (error.request) {
        console.log('Ошибка соеденений с сервером')
    } else {
        console.log('Непредвиденная ошибка');
    }
    error['message'] = message
    error['data'] = []
    console.log('error')
    return Promise.reject(error);
});
export default http
