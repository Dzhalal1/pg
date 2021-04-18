import Axios from "axios";
import Storage from "@/plugins/storage";

const http = Axios.create({
    // baseURL: 'https://mrs.kgsxa.ru/'
    baseURL: 'http://192.168.0.103:8073/'
})
if (localStorage.getItem('token')) {
    http.defaults.headers.common['Authorization'] = 'Token ' + Storage.getItem('token')
}
export default http
