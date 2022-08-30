import request from '@/api/index';

/**
 * get analyse data
 *
 * @param user_id
 * @param days 0 < days <= 120
 * @returns {*}
 */
export function getList(user_id, days) {
  return request({url: `/analyse/${user_id}/${days}`});
}

/**
 * get analyse data of specified date range
 *
 * @param user_id
 * @param date_from
 * @param date_to
 * @returns {*}
 */
export function getCustomList(user_id, date_from, date_to) {
  return request({url: `/analyse/${user_id}/${date_from}/${date_to}`});
}

