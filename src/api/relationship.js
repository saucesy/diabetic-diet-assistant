import request from '@/api/index';

/**
 * modify remark for relative
 *
 * @param data
 * @returns {*}
 */
export function editRemark(data) {
  return request({url: '/relationship', method: 'put', data});
}

