import request from '@/shared/api/request';

import { type Balance } from '../types';

export function getBalance(): Promise<Balance> {
  return request.get(`billing/balance`).json();
}
