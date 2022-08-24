import request from "@/api/index"

export function login(data) {
  return request({  url: '/user/login', method: 'post', data })
}

export function register(data) {
  return request({  url: '/user/register', method: 'post', data })
}

export function getSelfProfile() {
  return request({url: '/user/profile', method: 'get'})
}

export function getProfile(userID) {
  return request({url: `/user/profile/${userID}`, method: 'get'});
}

export function updateProfile(data, headers = {}) {
  return request({url: '/user/profile', method: 'put', data, headers});
}