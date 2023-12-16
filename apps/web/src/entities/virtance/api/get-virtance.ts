import { type Virtance } from '@/entities/virtance';
import request from '@/shared/api/request';

export function getVirtance(id: number): Promise<{ virtance: Virtance }> {
  return request.get(`virtances/${id}`).json();
}
