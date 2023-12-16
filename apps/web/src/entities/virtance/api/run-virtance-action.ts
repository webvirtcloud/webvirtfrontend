import { type ActionType, type Virtance } from '@/entities/virtance';
import request from '@/shared/api/request';

export function runVirtanceAction({
  id,
  ...payload
}: ActionType): Promise<{ virtance: Virtance }> {
  return request.post(`virtances/${id}/action`, { json: { ...payload } }).json();
}
