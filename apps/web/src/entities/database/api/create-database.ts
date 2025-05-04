import { type Database } from '@/entities/database';
import request from '@/shared/api/request';

export function createDatabase(payload: {
  name: string;
  engine: string;
  size: string;
  region: string;
  backups_enabled: boolean;
}): Promise<{ database: Database }> {
  return request.post('databases', { json: payload }).json();
}
