import request from '@/api/fetch';

import { User } from '../types';

export function getUser(): Promise<{ profile: User }> {
  return request.get('account/profile').json();
}
