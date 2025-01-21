import { type AuthPayload } from '@/entities/auth';
import request from '@/shared/api/request';
import { API_DOMAIN } from '@/shared/constants';

export function register(payload: AuthPayload): Promise<{ token: string }> {
  return request
    .post('account/register', {
      json: payload,
      prefixUrl: API_DOMAIN,
    })
    .json();
}
