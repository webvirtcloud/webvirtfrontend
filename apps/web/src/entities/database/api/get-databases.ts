import type { Database } from '@/entities/database';
import request from '@/shared/api/request';

export function getDatabases(): Promise<{ databases: Database[] }> {
  return request.get(`databases`).json();
}
