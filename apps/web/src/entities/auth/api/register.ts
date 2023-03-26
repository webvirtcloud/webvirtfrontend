import request from '@/shared/api/request';

import { AuthPayload } from '../types';

export const register = (payload: AuthPayload): Promise<{ token: string }> => {
  return request.post('account/register', { json: payload }).json();
};
