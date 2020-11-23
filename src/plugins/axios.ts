import Axios from "axios";

const http = Axios.create({
    baseURL: 'https://mrs.ksaa.edu.ru/'
})
export default http