import { type ActionType, type Database } from '@/entities/database';
import request from '@/shared/api/request';

export function runDatabaseAction({
  uuid,
  ...payload
}: ActionType): Promise<{ database: Database }> {
  return request.post(`databases/${uuid}/action`, { json: { ...payload } }).json();
}
