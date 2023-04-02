import request from '@/shared/api/request';
import type { ActionType, Virtance } from '../types';

export function runVirtanceAction({
  id,
  ...payload
}: ActionType): Promise<{ virtance: Virtance }> {
  return request.post(`virtances/${id}/action`, { json: { ...payload } }).json();
}
