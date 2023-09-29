import axios from 'axios'

const API_URL = 'https://weasel.okcsouthstake.org/api'

const _get = (ward, type) => {
    if (type === 'events'){
        return axios.get(`${API_URL}/events/ward/${ward}`)}
    else if (type === 'persons'){
        return axios.get(`${API_URL}/persons/ward/${ward}`)}
    else if (type === 'tools'){
        return axios.get(`${API_URL}/tools/ward/${ward}`)}
    else if (type === 'worships'){
        return axios.get(`${API_URL}/worships/ward/${ward}`)}
}

export default _get
