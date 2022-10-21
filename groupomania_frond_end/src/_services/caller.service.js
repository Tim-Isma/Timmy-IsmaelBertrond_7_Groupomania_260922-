import axios from 'axios'
import { accountService } from './account.service'

const Axios = axios.create({
    baseURL: 'http://localhost:4000'
})

/* Intercepteur pour le token */

Axios.interceptors.request.use(request => {

if(accountService.isLogged()) {
    request.headers.Authorization = 'bearer '+accountService.getToken()
}

    return request
})

export default Axios