import axios from 'axios'

const entriesApi = axios.create({
    baseURL: 'api/v1'
})


export default entriesApi;