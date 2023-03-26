import request from '@/shared/api/request';

import { AuthPayload } from '../types';

export function login(payload: AuthPayload): Promise<{ token: string }> {
  return request.post('account/login', { json: payload }).json();
}
