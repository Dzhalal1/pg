import Axios from "axios";
import Storage from "@/plugins/storage";

const http = Axios.create({
    baseURL: 'https://mrs.ksaa.edu.ru/'
    // baseURL: 'http://192.168.1.99:8025/'
})
if (localStorage.getItem('token')) {
    http.defaults.headers.common['Authorization'] = 'Token ' + Storage.getItem('token')
}
export default http
