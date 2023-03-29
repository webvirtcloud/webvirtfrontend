import request from '@/shared/api/request';
import { API_AUTH_HOST } from '@/shared/constants';

export function resetPassword(payload: { password: string }): Promise<unknown> {
  return request
    .post('account/reset_passwod', { json: payload, prefixUrl: API_AUTH_HOST })
    .json();
}
