import request from '@/api/index';

export function getList(user_id, days) {
  return request({url: `/analyse/${user_id}/${days}`});
}

export function getCustomList(user_id, date_from, date_to) {
  return request({url: `/analyse/${user_id}/${date_from}/${date_to}`});
}

