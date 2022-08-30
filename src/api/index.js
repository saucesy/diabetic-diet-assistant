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
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default function request({url, method = 'get', data = {}, headers = {}}) {
  return service({url, data, method, headers});
}