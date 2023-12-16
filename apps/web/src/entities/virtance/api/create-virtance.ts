import { type Virtance } from '@/entities/virtance';
import request from '@/shared/api/request';

export function createVirtance(payload): Promise<{ virtance: Virtance }> {
  return request.post('virtances', { json: payload }).json();
}
