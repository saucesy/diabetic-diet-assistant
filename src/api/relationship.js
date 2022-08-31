import request from '@/api/index'

/**
 * modify remark for relative
 *
 * @param data
 * @returns {Promise}
 */
export function editRemark(data) {
  return request({url: '/relationship', method: 'put', data})
}

/**
 * get relations list
 * @return {Promise}
 */
export function getList() {
  return request({url: '/relationship', method: 'get'})
}

/**
 * Agree to the user's request
 * @param {Object<String, any>} data
 * @return {Promise}
 */
export function agree(data) {
  return request({url: '/relationship/agree', method: 'put', data})
}

/**
 * Deny the user's application
 * @param {Number | String} id
 * @return {Promise}
 */
export function refuse(id) {
  return request({url: '/relationship/' + id, method: 'delete'})
}

/**
 *
 * @param {Object<String, any>} data
 * @return {Promise}
 */
export function addRelation(data) {
  return request({url: '/relationship', method: 'post', data})
}

