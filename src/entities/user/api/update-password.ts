import request from '@/api/fetch';

import { UpdatePasswordPayload } from '../types';

export function updatePassword(payload: UpdatePasswordPayload): Promise<unknown> {
  return request.post('account/change_password', { json: payload }).json();
}
