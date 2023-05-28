import request from '@/shared/api/request';
import { Console } from '../types';

export function consoleVirtance(id: number): Promise<{ console: Console }> {
  return request.get(`virtances/${id}/console`).json();
}
