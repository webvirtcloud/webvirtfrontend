import type { DBM } from '@/entities/database';
import request from '@/shared/api/request';

export function getDbms(): Promise<{ dbms: DBM[] }> {
  return request.get(`dbms`).json();
}
