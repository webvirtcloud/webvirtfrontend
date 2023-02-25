import ky from 'ky';

import { API_HOST } from '@/shared/constants';

const request = ky.create({
  prefixUrl: API_HOST,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = window.localStorage.getItem('token');

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }

        return request;
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        return response;
      },
      (request, options, response) => {
        if (response.status === 401) {
          window.localStorage.removeItem('token');

          window.location.href = '/sign-in';
        }
      },
    ],
  },
});

export default request;
