import request from '@/shared/api/request';
import { Virtance } from '../types';

export function getVirtance(id: number): Promise<{ virtance: Virtance }> {
  return request.get(`virtances/${id}`).json();
}
