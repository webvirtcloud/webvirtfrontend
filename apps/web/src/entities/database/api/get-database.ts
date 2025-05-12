import type { Database } from '@/entities/database';
import request from '@/shared/api/request';

export function getDatabase(id: string): Promise<{ database: Database }> {
  return request.get(`databases/${id}`).json();
}
