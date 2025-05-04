import request from '@/shared/api/request';

import { Database } from '../types';

export function getDatabases(): Promise<{ databases: Database[] }> {
  return request.get(`databases`).json();
}
