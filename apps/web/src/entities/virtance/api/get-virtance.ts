import request from '@/shared/api/request';
import { Virtance } from '../types';

export function getVirtance(uuid: string): Promise<{ virtance: Virtance }> {
  return request.get(`virtances/${uuid}`).json();
}
