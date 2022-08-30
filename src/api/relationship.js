import request from '@/api/index';

export function editRemark(data) {
  return request({url: '/relationship', method: 'put', data});
}

