import request from '@/shared/api/request';
import { API_BASE_DOMAIN, API_PREFIX } from '@/shared/constants';

import { AuthPayload } from '../types';

export const register = (payload: AuthPayload): Promise<{ token: string }> => {
  return request
    .post('account/register', {
      json: payload,
      prefixUrl: `${API_BASE_DOMAIN}${API_PREFIX}`,
    })
    .json();
};
