import request from '@/api/index'

/**
 * Gets the meal data for the specified date
 * @param {String} user_id
 * @param {String} date
 * @return {Promise}
 */
export function getMealByDate(user_id, date) {
  return request({url: `/diet/${user_id}/${date}`})
}

/**
 * update meal
 * @param {Object} data
 * @return {Promise}
 */
export function updateMeal(data) {
  return request({url: '/diet', method: 'put', data})
}

/**
 * feedback
 * @param {Object} data
 * @return {Promise}
 */
export function mealFeedback(data) {
  return request({url: '/diet/feedback', method: 'put', data})
}

/**
 * @param {Object} data
 * @return {Promise}
 */
export function addMeal(data) {
  return request({url: '/diet', method: 'post', data})
}

/**
 *
 * @param {String | Number} id
 * @return {Promise}
 */
export function deleteMeal(id) {
  return request({url: `/diet/${id}`, method: 'delete'})
}