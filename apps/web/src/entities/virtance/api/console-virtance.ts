import { type Console } from '@/entities/virtance';
import request from '@/shared/api/request';

export function consoleVirtance(id: number): Promise<{ console: Console }> {
  return request.get(`virtances/${id}/console`).json();
}
