import { type Backup } from '@/entities/image';
import request from '@/shared/api/request';

export function getVirtancesBackups(id: number): Promise<{ backups: Backup[] }> {
  return request.get(`virtances/${id}/backups`).json();
}
