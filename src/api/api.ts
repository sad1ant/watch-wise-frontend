import axios from 'axios'

export const API_URL = 'http://localhost:8088'

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default api