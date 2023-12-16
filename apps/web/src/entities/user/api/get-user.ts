import { type User } from '@/entities/user';
import request from '@/shared/api/request';

export function getUser(): Promise<{ profile: User }> {
  return request.get('account/profile').json();
}
