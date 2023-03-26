import request from '@/shared/api/request';
import { Virtance } from '../types';

export function createVirtance(payload): Promise<{ virtance: Virtance }> {
  return request.post('virtances', { json: payload }).json();
}
