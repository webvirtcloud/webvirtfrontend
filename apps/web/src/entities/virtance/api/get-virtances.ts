import request from '@/shared/api/request';
import { Virtance } from '../types';

export function getVirtances(): Promise<{ virtances: Virtance[] }> {
  return request.get('virtances').json();
}
