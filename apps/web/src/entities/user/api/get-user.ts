import request from '@/shared/api/request';

import { User } from '../types';

export function getUser(): Promise<{ profile: User }> {
  return request.get('account/profile').json();
}
