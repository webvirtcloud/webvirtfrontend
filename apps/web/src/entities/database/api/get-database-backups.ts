import type { Backup } from '@/entities/image';
import request from '@/shared/api/request';

export function getDatabaseBackups(uuid: string): Promise<{ backups: Backup[] }> {
  return request.get(`databases/${uuid}/backups`).json();
}
