import request from '@/shared/api/request';
import { API_BASE_DOMAIN, API_PREFIX } from '@/shared/constants';

export function resetPassword(payload: { password: string }): Promise<unknown> {
  return request
    .post('account/reset_passwod', {
      json: payload,
      prefixUrl: `${API_BASE_DOMAIN}${API_PREFIX}`,
    })
    .json();
}
