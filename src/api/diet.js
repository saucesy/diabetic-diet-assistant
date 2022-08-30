import request from "@/api/index";

export function getByDate(date) {
  return request({url: `/diet/${date}`})
}

export function update(data) {
  // return request({url: '/diet', method: 'put', data})
}

export function mealFeedback(data) {
  return request({url: '/diet/feedback', method: 'put', data})
}