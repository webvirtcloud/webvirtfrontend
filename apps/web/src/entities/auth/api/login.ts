import request from '@/shared/api/request';
import { API_AUTH_HOST } from '@/shared/constants';

import { AuthPayload } from '../types';

export function login(payload: AuthPayload): Promise<{ token: string }> {
  return request
    .post('account/login', { json: payload, prefixUrl: API_AUTH_HOST })
    .json();
}
