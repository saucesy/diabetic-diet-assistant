import request from '@/api/index';

/**
 * upload image
 *
 * @param file
 * @returns {*}
 */
export function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  return request({
    url: '/file/upload', method: 'post', data: formData,
    headers: {
      'Content-type': 'multipart/form-data'
    }
  });
}