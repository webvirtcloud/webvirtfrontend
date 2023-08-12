import request from '@/shared/api/request';
import type { ActionType } from '../types';

export function runImageAction({ id, ...payload }: ActionType) {
  return request.post(`images/${id}/action`, { json: { ...payload } }).json();
}
