import request from '@/api/fetch';

import { User } from '../types';

export const updateUser = (payload: User): Promise<{ profile: User }> => {
  return request.put('account/profile', { json: payload }).json();
};
