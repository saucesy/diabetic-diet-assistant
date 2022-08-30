import axios from 'axios'
import store from "@/store";
import {getToken} from "@/utils/auth";

const service = axios.create({
  baseURL: process.env["VUE_APP_BASE_URL"],
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use((config) => {
  if(store.getters.token) {
    config.headers['Authorization'] = getToken()
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  if (response.data.code == 200) return response.data
  return Promise.reject(response.data)
}, (error) => {
  return Promise.reject(error)
})

export default function request({url, method = 'get', data = {}, headers = {}}) {
  return service({url, data, method, headers});
}