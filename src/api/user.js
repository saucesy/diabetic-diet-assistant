import request from '@/api/index';

/**
 * login
 * @param data
 * @returns {*}
 */
export function login(data) {
  return request({url: '/user/login', method: 'post', data});
}

/**
 * register
 * @param data
 * @returns {*}
 */
export function register(data) {
  return request({url: '/user/register', method: 'post', data});
}

/**
 * get self profile
 * @returns {*}
 */
export function getSelfProfile() {
  return request({url: '/user/profile', method: 'get'});
}

/**
 * get others profile
 * @param userID
 * @returns {*}
 */
export function getProfile(userID) {
  return request({url: `/user/profile/${userID}`, method: 'get'});
}

/**
 * update self profile
 * @param data
 * @param headers
 * @returns {*}
 */
export function updateProfile(data, headers = {}) {
  return request({url: '/user/profile', method: 'put', data, headers});
}

/**
<<<<<<< HEAD
 * search user
 * @param {String} email
 * @return {Promise}
 */
export function searchByEmail(email) {
  return request({url: '/user/search/' + email, method: 'get'})
=======
 * logout
 * @returns {*}
 */
export function logout() {
  return request({url: '/user/logout', method: 'get'});
>>>>>>> 886eda0a25e9fac25f44d509945bb86487044fde
}