import request from '@/shared/api/request';

export function resetPassword(payload: { password: string }): Promise<unknown> {
  return request.post('account/reset_passwod', { json: payload }).json();
}
