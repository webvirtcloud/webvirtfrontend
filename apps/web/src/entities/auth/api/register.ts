import request from '@/api/fetch';

import { AuthPayload } from '../types';

export const register = (payload: AuthPayload): Promise<{ token: string }> => {
  return request.post('account/register', { json: payload }).json();
};
