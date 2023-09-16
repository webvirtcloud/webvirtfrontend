import request from '@/shared/api/request';

export function resendConfirmEmail(): Promise<unknown> {
  return request.post('account/verify_email').json();
}
