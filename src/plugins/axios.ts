import Axios from "axios";
import Storage from "@/plugins/storage";

const http = Axios.create({
    // baseURL: 'https://mrs.kgsxa.ru/'
    baseURL: 'http://192.168.0.101:8000/'
})
if (localStorage.getItem('token')) {
    http.defaults.headers.common['Authorization'] = 'Token ' + Storage.getItem('token')
}
export default http
