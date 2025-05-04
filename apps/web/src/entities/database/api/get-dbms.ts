import request from '@/shared/api/request';

import { Dbm } from '../types';

export function getDbms(): Promise<{ dbms: Dbm[] }> {
  return request.get(`dbms`).json();
}
