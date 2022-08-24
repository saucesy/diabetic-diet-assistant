import Cookies from "js-cookie"

const tokenKey = 'X-Token'

export function setToken(value ,remember = false) {
  Cookies.set(tokenKey, value, remember ? {expires: 2} : {});
}

export function getToken() {
  return Cookies.get(tokenKey)
}

export function removeToken() {
  Cookies.remove(tokenKey)
}