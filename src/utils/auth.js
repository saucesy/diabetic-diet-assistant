import Cookies from "js-cookie"

const tokenKey = 'X-Token'

/**
 * set token
 *
 * @param value
 * @param remember
 */
export function setToken(value ,remember = false) {
  // uses js-cookie
  Cookies.set(tokenKey, value, remember ? {expires: 2} : {});
}

/**
 * get token and prevent undefined
 *
 * @returns {*|string}
 */
export function getToken() {
  // uses js-cookie
  return Cookies.get(tokenKey) ?? ''
}

/**
 * remove token
 */
export function removeToken() {
  // uses js-cookie
  Cookies.remove(tokenKey)
}

