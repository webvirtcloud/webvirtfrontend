import request from '@/api/fetch';

export function resetPassword(payload: { password: string }): Promise<unknown> {
  return request.post('account/reset_passwod', { json: payload }).json();
}
