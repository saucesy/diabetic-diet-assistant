import request from "@/api/index";

/**
 * get food list
 *
 * @returns {*}
 */
export function getList() {
  return request({url: '/food'})
}

