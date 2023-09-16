import request from '@/shared/api/request';

export function confirmEmail(token: string): Promise<unknown> {
  return request.get(`account/verify_email/${token}`).json();
}
